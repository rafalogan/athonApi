import { RelationalServiceOptions } from 'src/core/types';
import { AbstractRelationalService } from 'src/core/services';

const fields = ['id', 'name', 'active', 'created_at as createdAt', 'updated_at as updatedAt'];

export class NewsletterService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: NewsletterService.name, table: 'newsletter', fields });
	}
}
