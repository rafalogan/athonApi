import { Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

export interface UserRuleEntity extends Timestampsfileds {
	userId: number;
	ruleId: number;
}

export interface UserRulesEntity {
	data: UserRuleEntity[];
	pagination: Pagination;
}
