import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { AbstractDatabaseService } from 'src/core/services';
import { Newsletter } from 'src/repositories/entities';
import { clearTimestampFields, existsOrError, notExistisOrError } from 'src/util';
import { NewsletterEntity, NewslettersEntity, ReadTableOptions, RelationalServiceOptions } from 'src/repositories/types';

const fields = ['id', 'name', 'active', 'created_at as createdAt', 'updated_at as updatedAt'];

export class NewsletterService extends AbstractDatabaseService {
	constructor(conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'newsletter', { ...options, fields });
	}

	async fieldsFilter(raw: Newsletter | NewsletterEntity) {
		const fromDB = await this.findSubscribeByEmail(raw.email);

		notExistisOrError(fromDB, 'E-mail already exists');
		existsOrError(raw.email, 'Email field is required');
	}

	async create(item: Newsletter) {
		try {
			await this.fieldsFilter(item);
		} catch (error) {
			return error;
		}

		return super.create(item);
	}

	read(options?: ReadTableOptions): Promise<any> {
		return super
			.read(options)
			.then(result => ('data' in result ? this.renderList(result) : new Newsletter(result)))
			.catch(err => err);
	}

	renderList(raw: NewslettersEntity) {
		const data = raw.data.map(item => new Newsletter(item)).map(clearTimestampFields);

		return { ...raw, data };
	}

	findSubscribeByEmail(email: string) {
		return this.instance(this.table)
			.select(...this.fields)
			.where({ email })
			.first()
			.then((data: NewsletterEntity) => new Newsletter(data))
			.catch(err => err);
	}
}
