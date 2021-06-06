import { RelationalServiceOptions } from 'src/core/types';
import { AbstractRelationalService } from 'src/core/services';
import { Newsletter, NewsletterEntity } from 'src/entities';
import { existsOrError, ResponseException } from 'src/util';
import httpStatus from 'http-status';

const fields = ['id', 'name', 'active', 'created_at as createdAt', 'updated_at as updatedAt'];

export class NewsletterService extends AbstractRelationalService {
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
}
