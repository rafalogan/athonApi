import { Knex } from 'knex';

import { existsOrError, ResponseException } from 'src/util';
import { AbstractCacheService } from 'src/core/services/abstract-cache.service';
import { RelationalContext, RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { Pagination } from 'src/core/domains';

export abstract class AbstractRelationalService extends AbstractCacheService implements RelationalContext {
	protected instance: Knex;
	protected table: string;
	protected fields: string[];
	protected enableCache: boolean;
	protected cacheTime?: number;

	protected readonly serviceName: string;

	protected constructor(options: RelationalServiceOptions) {
		super(options);
		this.instance = options.instance;
		this.table = options.table;
		this.fields = options?.fields || [];
		this.enableCache = options?.enableCache || false;
		this.serviceName = options.serviceName;
	}

	create(item: any): Promise<any> {
		item.createdAt = new Date();

		return this.instance(this.table)
			.insert(item)
			.then((result: any) => result)
			.catch(err => this.log.error(`Insert Failed in Table: ${this.table}`, err));
	}

	read(options: any): Promise<any> {
		const columns = options?.fields ?? this.fields;

		if (this.enableCache) return this._checkCache(options);
		return options?.id ? this._findOneById(Number(options.id), columns) : this._findAll(options);
	}

	update(values: any, id: number): Promise<any> {
		values.updatedAt = new Date();

		return this.instance(this.table)
			.update(values)
			.where({ id })
			.then(async result => {
				await this._clearCache(id);
				return result;
			})
			.catch(err => this.log.error(`Update on register nº ${id} in table: ${this.table}`, err));
	}

	async delete(id: any): Promise<any> {
		const element = await this._findOneById(id);
		try {
			existsOrError(element, `The register nº ${id} not find in table: ${this.table}`);
		} catch (msg) {
			return new ResponseException(msg);
		}

		return this.instance(this.table)
			.where({ id })
			.del()
			.then(async result => {
				await this._clearCache(id);
				return {
					deleted: result > 0,
					element,
				};
			})
			.catch(err => this.log.error(`Not possible to delete nº ${id} in table: ${this.table}`, err));
	}

	private _findOneById(id: number, columns: string[] = []) {
		return this.instance(this.table)
			.select(...columns)
			.where({ id })
			.first()
			.then((item: any) => item)
			.catch(err => this.log.error(`Find register failed in ${this.table}`, err));
	}

	protected async _findAll(options?: any): Promise<any> {
		const page = options?.page ?? 1;
		const limit = options?.limit ?? 10;
		const columns = options?.fields ?? this.fields;
		const count = await this.countById();
		const pagination = new Pagination({ page, count, limit });

		return this.instance(this.table)
			.select(...columns)
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy('id')
			.then((data: any[]) => ({ data, pagination }))
			.catch(err => this.log.error(`Find register fail in table: ${this.table}`, err));
	}

	protected async countById() {
		const result = await this.instance(this.table).count({ count: 'id' }).first();
		return Number(result?.count);
	}

	private _checkCache(options?: any) {
		const id = Number(options?.id);
		const columns = options?.fields ?? this.fields;

		return id
			? this.findCahce({ serviceName: this.serviceName, id }, () => this._findOneById(id, columns), this.cacheTime)
			: this.findCahce({ serviceName: this.serviceName, id: 'list' }, () => this._findAll(options), this.cacheTime);
	}

	private async _clearCache(id: any = 'list') {
		if (id !== 'list') await this.deleteCahce({ serviceName: this.serviceName, id });
		return this.deleteCahce({ serviceName: this.serviceName, id: 'list' });
	}
}
