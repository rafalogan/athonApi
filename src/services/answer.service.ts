import httpStatus from 'http-status';

import { AbstractDatabaseService } from 'src/core/services';
import { ReadTableOptions, RelationalServiceOptions } from 'src/core/types';
import { Answer, Contact } from 'src/repositories/entities';
import { clearTimestampFields, existsOrError, notExistisOrError, ResponseException } from 'src/util';
import { ContactService } from 'src/services';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import { AnswerEntity, AnswerstEntity } from 'src/repositories/types';

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
	constructor(private contactService: ContactService, conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'answers', { ...options, fields });
	}

	async validateFields(raw: Answer | AnswerEntity) {
		const fromDB = await this.read({ id: raw?.id });

		notExistisOrError(fromDB, 'This answer already exists');
		existsOrError(raw.subject, 'Subject is a required field.');
		existsOrError(raw.content, 'Content is a required field.');
		existsOrError(raw.contactId, 'ContactId is a required field.');
		existsOrError(raw.userId, 'UserId is a required field.');
	}

	async create(item: Answer) {
		try {
			await this.validateFields(item);
		} catch (err: ResponseException | any) {
			return err;
		}

		return super.create(item);
	}

	read(options?: ReadTableOptions) {
		return super
			.read(options)
			.then(async result => (result.data ? this.setAnswerList(result) : this.setAnswer(result)))
			.then(result => result)
			.catch(error => error);
	}

	private setAnswerList(result: AnswerstEntity) {
		const data = result.data
			.map(async item => {
				const answer = new Answer(item);
				answer.contact = await this.searchContact(answer.contactId);

				return answer;
			})
			.map(clearTimestampFields);

		return {
			...result,
			data,
		};
	}

	private async setAnswer(result: AnswerEntity) {
		const answer = new Answer(result);
		answer.contact = await this.searchContact(answer.contactId);

		return answer;
	}

	private searchContact(id: number) {
		return this.contactService
			.read({ id })
			.then(result => new Contact(result))
			.catch(error => error);
	}
}
