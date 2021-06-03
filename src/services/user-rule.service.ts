import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { RulesReadOptions } from 'src/services/types/services';

const fields = ['user_id as userId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class UserRuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: UserRuleService.name, table: 'user_rules', fields });
	}

	validateFields(raw) {}

	read(options: RulesReadOptions): Promise<any> {
		return super.read(options);
	}

	findRulesByUserId(id: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ id })
			.then((result: any[]) => result)
			.catch(err => this.log.error(`find rules by User ${id} failed`, err));
	}
}
