import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';

const fields = [
	'id',
	'subject',
	'content',
	'contact_id as contactId',
	'user_id as userId',
	'created_at as createdAt',
	'updated_at as updatedAt',
];

export class AnswerService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: AnswerService.name, table: 'answers', fields });
	}
}
