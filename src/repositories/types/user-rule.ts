import { Pagination } from 'src/core/domains';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { UserRule } from 'src/repositories/entities';
import { PaginationDomain } from 'src/core/types';

export interface UserRuleEntity extends TimestampsFields {
	userId: number;
	ruleId: number;
}

export interface UserRulesEntity {
	data: UserRuleEntity[] | UserRule[];
	pagination: Pagination | PaginationDomain;
}
