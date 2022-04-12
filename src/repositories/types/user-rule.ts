import { Timestampsfileds } from 'src/repositories/entities';
import { Pagination } from 'src/core/domains';

export interface UserRuleEntity extends Timestampsfileds {
	userId: number;
	ruleId: number;
}

export interface UserRulesEntity {
	data: UserRuleEntity[];
	pagination: Pagination;
}
