import { AbstractRelationalService, ICServiceOptions, IRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';

export class ProfileRuleService extends AbstractRelationalService {
	constructor(profileRulesServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(profileRulesServiceOptions, cacheServiceOptions, envServiceOptions);
	}

	findRulesByProfileId(profileId: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ profile_id: profileId })
			.then(rules => rules)
			.catch(err => this.log.error(`Find rules by profile ${profileId} failed`, err));
	}
}
