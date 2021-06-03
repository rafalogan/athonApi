import { ProfileRuleService, RuleService } from 'src/services';
import { RelationalServiceOptions } from 'src/core/types';

export interface ProfileServiceOptions extends RelationalServiceOptions {
	profileRuleService: ProfileRuleService;
	ruleService: RuleService;
}

export interface ProfileRuleReadOptions {
	id?: string;
	page?: number;
	limit?: number;
	fields?: string[];
}
