import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { ProfileRule } from 'src/repositories/entities';
import { RelationalReadOptions } from 'src/repositories/types/relational-context';

export interface ProfileRuleEntity extends TimestampsFields {
	profileId: number;
	ruleId: number;
}

export interface ProfileRuleListEntity {
	data: ProfileRuleEntity[] | ProfileRule[];
	pagination: Pagination;
}

export interface ReadRulesOptions extends RelationalReadOptions {
	profileId?: number;
	ruleId?: number;
	userId?: number;
	fields?: string[];
}
