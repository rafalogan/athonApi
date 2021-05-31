import { ProfileService, RuleService, UserRuleService } from 'src/services';
import { RelationalServiceOptions } from 'src/core/types';

export interface UserServiceOptions extends RelationalServiceOptions {
	profileService: ProfileService;
	userRuleService: UserRuleService;
	ruleService: RuleService;
	salt: number;
}
