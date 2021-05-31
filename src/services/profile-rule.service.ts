import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';

const fields = ['profile_id as profileId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class ProfileRuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: ProfileRuleService.name, table: 'profiles_rules', fields });
	}

	findRulesByProfileId(profileId: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ profile_id: profileId })
			.then(rules => rules)
			.catch(err => this.log.error(`Find rules by profile ${profileId} failed`, err));
	}
}
