import { RelationalServiceOptions } from 'src/core/types';
import { AbstractDatabaseService } from 'src/core/services';
import { Newsletter, NewsletterEntity, NewsletterListEntities } from 'src/repositories/entities';
import { clearTimestamp, existsOrError, ResponseException } from 'src/util';
import httpStatus from 'http-status';

const fields = ['id', 'name', 'active', 'created_at as createdAt', 'updated_at as updatedAt'];

export class NewsletterService extends AbstractDatabaseService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: NewsletterService.name, table: 'newsletter', fields });
	}

	fieldsFilter(raw: NewsletterEntity) {
		try {
			existsOrError(raw.email, 'Email field is required');

			return new Newsletter(raw);
		} catch (message) {
			const err = new ResponseException(message);
			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	renderList(raw: NewsletterListEntities) {
		const { pagination } = raw;
		const data = raw.data.map(item => new Newsletter(item)).map(clearTimestamp);

		return { data, pagination };
	}

	findSubscribeByEmail(email: string) {
		return this.instance(this.table)
			.select(...this.fields)
			.where({ email })
			.then((data: any) => data)
			.catch(err => this.log.error(`Find Subscribe by Email: ${email}`, err));
	}
}