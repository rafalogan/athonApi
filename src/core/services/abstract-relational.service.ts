import { Knex } from 'knex';

import { LogHandler } from 'src/core/handlers';
import { existsOrError } from 'src/util/validate';
import { IRPginationOptions, IRelationalContext } from 'src/core/services/types/relational-context';
import { IPagination } from 'src/core/services/types/pagination';

export abstract class AbstractRelationalService implements IRelationalContext {
	constructor(protected log: LogHandler, protected instance: Knex, protected table: string, protected fields: string[] = []) {}

	create(item: any): Promise<any> {
		return this.instance(this.table)
			.insert(item)
			.then((result: any) => result)
			.catch(err => this.log.error(`Insert Failed in Table: ${this.table}`, err));
	}

	read(options: IRPginationOptions, id?: number): Promise<any> {
		const columns = options.fields ?? this.fields;

		if (id) return this._findOneById(id, columns);
		return this._findAll(options);
	}

	update(values: any, id: number): Promise<any> {
		return this.instance(this.table)
			.update(values)
			.where({ id })
			.then(result => result)
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
			.then(result => ({ deleted: result > 0, element }))
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
}
