import { Knex } from 'knex';

import { convertDataValues, DatabaseException, existsOrError, onError, ResponseException } from 'src/util';
import { AbstractCacheService } from 'src/core/services/abstract-cache.service';
import { ReadTableOptions, RelationalContext, RelationalServiceOptions } from 'src/core/types';
import { Pagination } from 'src/repositories/models';
import { RedisClientType } from 'redis';
import { QueryResult } from 'pg';
import QueryBuilder = Knex.QueryBuilder;

export abstract class AbstractDatabaseService extends AbstractCacheService implements RelationalContext {
	protected instance: Knex;
	protected table: string;
	protected fields: string[];

	protected constructor(conn: Knex, cacheConn: RedisClientType, table: string, options?: RelationalServiceOptions) {
		super(cacheConn, options);
		this.instance = conn;
		this.table = table;
		this.fields = options?.fields || [];
	}

	create(item: any) {
		item.createdAt = new Date();
		const data = convertDataValues(item);

		return this.instance(this.table)
			.insert(data)
			.then((result: any) => ({ create: result.rowCount > 0, data, result }))
			.catch(err => err);
	}

	read(options?: ReadTableOptions) {
		if (this.clientActive) return this.checkCache(options);
		return options?.id ? this.findOneById(Number(options.id), options) : this.findAll(options);
	}

	async update(id: number, values: any): Promise<any> {
		values.updatedAt = new Date();
		const data = convertDataValues(values);

		if (this.clientActive) await this.clearCache(id);

		return this.instance(this.table)
			.update(data)
			.where({ id })
			.then(result => result)
			.catch(err => err);
	}

	async delete(id: any): Promise<any> {
		const element = await this.findOneById(id);

		try {
			existsOrError(element, `The register nº ${id} not find in table: ${this.table}`);
		} catch (error: ResponseException | any) {
			throw new DatabaseException(error.message);
		}

		if (this.clientActive) await this.clearCache(id);

		return this.instance(this.table)
			.where({ id })
			.del()
			.then(async result => ({ deleted: result > 0, element }))
			.catch(err => err);
	}

	protected async countById() {
		return this.instance(this.table)
			.count({ count: 'id' })
			.first()
			.then(result => Number(result?.count))
			.catch(err => {
				onError(`Count by id in table: ${this.table}`, err);
				return 0;
			});
	}

	protected async clearCache(id?: number) {
		if (id) await this.deleteCache([`GET:content`, this.read.name, `${id}`]);
		return this.deleteCache(['GET:allContent', this.read.name]);
	}

	protected findOneById(id: number, options?: ReadTableOptions) {
		return this.instance(this.table)
			.select(...(options?.fields ?? this.fields))
			.where({ id })
			.first()
			.then(item => item)
			.catch(err => onError(`Find register failed in ${this.table}`, err));
	}

	protected async findAll(options?: ReadTableOptions): Promise<any> {
		const page = options?.page ?? 1;
		const limit = options?.limit ?? 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.instance(this.table)
			.select(...(options?.fields ?? this.fields))
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy(options?.where || 'id', options?.order || 'asc')
			.then((data: any[]) => ({ data, pagination }))
			.catch(err => onError(`Find register fail in table: ${this.table}`, err));
	}

	protected checkCache(options?: ReadTableOptions) {
		const id = Number(options?.id);

		return id
			? this.findCache([`GET:content`, this.read.name, `${id}`], () => this.findOneById(id, options), this.cacheTime)
			: this.findCache(['GET:allContent', this.read.name], () => this.findAll(options), this.cacheTime);
	}
}
