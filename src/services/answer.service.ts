import httpStatus from 'http-status';

import { AbstractDatabaseService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { Answer, AnswerEntity, AnswerListEntity, Contact } from 'src/repositories/entities';
import { clearTimestamp, existsOrError, ResponseException } from 'src/util';
import { ContactService } from 'src/services';

const fields = [
	'id',
	'subject',
	'content',
	'contact_id as contactId',
	'user_id as userId',
	'created_at as createdAt',
	'updated_at as updatedAt',
];

export class AnswerService extends AbstractDatabaseService {
	constructor(private contactService: ContactService, options: RelationalServiceOptions) {
		super({ ...options, serviceName: AnswerService.name, table: 'answers', fields });
	}

	validateFields(raw: AnswerEntity) {
		try {
			existsOrError(raw.subject, 'Subject is a requiresd field.');
			existsOrError(raw.content, 'Content is a requiresd field.');
			existsOrError(raw.contactId, 'ContactId is a requiresd field.');
			existsOrError(raw.userId, 'UserId is a requiresd field.');

			return new Answer(raw);
		} catch (message) {
			const err = new ResponseException(message);

			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	createAnswerList(raw: AnswerListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new Answer(item)).map(clearTimestamp);

		return { data, pagination };
	}

	findContact(id: number) {
		return this.contactService
			.read({ id })
			.then(data => new Contact(data))
			.catch(err => this.log.error('Find contact failed', err));
	}
}
