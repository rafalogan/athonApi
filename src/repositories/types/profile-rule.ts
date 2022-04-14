import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { PaginationOptions, RelationalReadOptions } from 'src/core/types';

export interface ProfileRuleEntity extends TimestampsFields {
	profileId: number;
	ruleId: number;
}

export interface ProfileRuleListEntity {
	data: ProfileRuleEntity[];
	pagination: Pagination;
}

export interface ReadRulesOptions extends RelationalReadOptions {
	profileId?: number;
	ruleId?: number;
	fields?: string[];
}
