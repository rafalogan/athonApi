import { ProfileRuleService, RuleService } from 'src/services';
import { RelationalServiceOptions } from 'src/core/types';

export interface ProfileServiceOptions extends RelationalServiceOptions {
	profileRuleService: ProfileRuleService;
	ruleService: RuleService;
}
