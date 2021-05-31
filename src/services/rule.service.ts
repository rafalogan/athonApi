import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';

const fields = ['id', 'name', 'description', 'created_at as createdAt', 'updated_at as updatedAt'];

export class RuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: RuleService.name, table: 'rules', fields });
	}
}
