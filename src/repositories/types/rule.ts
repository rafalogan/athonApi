import { Rule, Timestampsfileds } from 'src/repositories/entities';
import { PaginationDomain } from 'src/core/domains';

export interface RuleEntity extends Timestampsfileds {
	id: number;
	name: string;
	description: string;
}

export interface ListRoules {
	data: Rule[];
	pagination: PaginationDomain;
}
