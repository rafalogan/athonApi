import { Knex } from 'knex';

import { IRPginationOptions, IRelationalContext, IRServiceOptions, ICServiceOptions } from 'src/core/services/types/';
import { IPagination } from 'src/core/services/types/pagination';
import { existsOrError } from 'src/util';
import { AbstractCacheService } from 'src/core/services/abstract-cache.service';
import { IEnvServiceOptions } from 'src/services/types';

export abstract class AbstractRelationalService extends AbstractCacheService implements IRelationalContext {
	protected instance: Knex;
	protected table: string;
	protected fields: string[];
	protected enableCache: boolean;
	protected cacheTime?: number;

	private serviceName: string;

	constructor(serviceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envOptions: IEnvServiceOptions) {
		super(cacheServiceOptions, serviceOptions.log, envOptions.env);
		this.instance = serviceOptions.instance;
		this.table = serviceOptions.table;
		this.fields = serviceOptions?.fields || [];
		this.enableCache = envOptions?.enableCache || false;
		this.serviceName = serviceOptions.serviceName;
	}

	create(item: any): Promise<any> {
		return this.instance(this.table)
			.insert(item)
			.then((result: any) => result)
			.catch(err => this.log.error(`Insert Failed in Table: ${this.table}`, err));
	}

	read(options: IRPginationOptions, id?: number): Promise<any> {
		const columns = options.fields ?? this.fields;

		if (this.enableCache) return this._checkCache(options, id, columns);
		return id ? this._findOneById(id, columns) : this._findAll(options);
	}

	update(values: any, id: number): Promise<any> {
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
			return msg;
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

	pagination(page: number, count: number, limit: number): IPagination {
		return {
			count,
			page,
			pages: Number(Math.ceil(count / limit)),
			limit,
		};
	}

	private _findOneById(id: number, columns: string[] = []) {
		return this.instance(this.table)
			.select(...columns)
			.where({ id })
			.first()
			.then((item: any) => item)
			.catch(err => this.log.error(`Find register failed in ${this.table}`, err));
	}

	private async _findAll(options: IRPginationOptions) {
		const page = options.page ?? 1;
		const limit = options.total ?? 10;
		const columns = options.fields ?? this.fields;
		const count = await this._countById();
		const pagination = this.pagination(page, count, limit);

		return this.instance(this.table)
			.select(...columns)
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy('id')
			.then((data: any[]) => ({ data, pagination }))
			.catch(err => this.log.error(`Find register fail in table: ${this.table}`, err));
	}

	private async _countById() {
		const result = await this.instance(this.table).count({ count: 'id' }).first();
		return Number(result?.count);
	}

	private _checkCache(options: IRPginationOptions, id?: number, columns: string[] = []) {
		return id
			? this.findCahce({ serviceName: this.serviceName, id }, () => this._findOneById(id, columns), this.cacheTime)
			: this.findCahce({ serviceName: this.serviceName, id: 'list' }, () => this._findAll(options), this.cacheTime);
	}

	private async _clearCache(id: any = 'list') {
		if (id !== 'list') await this.deleteCahce({ serviceName: this.serviceName, id });
		return this.deleteCahce({ serviceName: this.serviceName, id: 'list' });
	}
}
