import { Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

export interface ProfileRuleEntity extends Timestampsfileds {
	profileId: number;
	ruleId: number;
}

export interface ProfileRuleListEntity {
	data: ProfileRuleEntity[];
	pagination: Pagination;
}
