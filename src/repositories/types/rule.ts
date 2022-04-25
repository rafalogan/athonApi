import { TimestampsFields } from 'src/repositories/types/timestamps';

import { Rule } from 'src/repositories/entities';
import { PaginationDomain } from 'src/core/types';
import { Pagination } from 'src/repositories/models';

export interface RuleEntity extends TimestampsFields {
	id?: number;
	name: string;
	description: string;
}

export interface RulesEntity {
	data: Rule[] | RuleEntity[];
	pagination: PaginationDomain | Pagination;
}
