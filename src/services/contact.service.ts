import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { AbstractDatabaseService } from 'src/core/services';
import { Contact } from 'src/repositories/entities';
import { RelationalServiceOptions } from 'src/core/types';
import { ContactEntity } from 'src/repositories/types';
import { existsOrError } from 'src/util';

const fields = ['id', 'name', 'email', 'subject', 'phone', 'message', 'created_at as createdAt'];

export class ContactService extends AbstractDatabaseService {
	constructor(con: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(con, cache, 'contacts', { ...options, fields });
	}

	validateFields(item: Contact | ContactEntity) {
		existsOrError(item.name, 'Name is a required field.');
		existsOrError(item.email, 'Email is a required field.');
		existsOrError(item.subject, 'Subject is a required field.');
		existsOrError(item.message, 'Message is a required field.');
	}
}
