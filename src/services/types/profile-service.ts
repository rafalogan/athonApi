import { IRServiceOptions } from 'src/core/services/types';
import { ProfileRuleService, RuleService } from 'src/services';

export interface IProfileServiceOptions extends IRServiceOptions {
	profileRulesService: ProfileRuleService;
	ruleService: RuleService;
}
