import httpStatus from 'http-status';

import { RelationalServiceOptions } from 'src/core/types';
import { AbstractRelationalService } from 'src/core/services';
import { Contact, ContactEntity, ContactListEntity } from 'src/entities';
import { clearTimestamp, convertDataValues, existsOrError } from 'src/util';

const fields = ['id', 'name', 'email', 'subject', 'phone', 'message', 'created_at as createdAt'];

export class ContactService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: ContactService.name, table: 'contacts', fields });
	}

	validateFields(item: ContactEntity) {
		try {
			existsOrError(item.name, 'Name is a required field.');
			existsOrError(item.email, 'Email is a required field.');
			existsOrError(item.subject, 'Subject is a required field.');
			existsOrError(item.message, 'Message is a required field.');

			return new Contact(item);
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}
	}

	listContacts(raw: ContactListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new Contact(item)).map(clearTimestamp);

		return { data, pagination };
	}

	async update(values: Contact, id: number) {
		const data = convertDataValues(values);

		return this.instance(this.table)
			.update(data)
			.where({ id })
			.then(result => {
				this.clearCache(id);
				return result;
			})
			.catch(err => this.log.error(`Update id:${id} is failed.`, err));
	}
}
