import { ProfileService, RuleService, UserRuleService } from 'src/services';
import { IRServiceOptions } from 'src/core/services/types';

export interface IUserServiceOptions extends IRServiceOptions {
	profileService: ProfileService;
	userRuleService: UserRuleService;
	ruleService: RuleService;
}
