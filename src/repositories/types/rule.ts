import { Timestampsfileds } from 'src/repositories/types/timestamps';
import { Rule } from 'src/repositories/entities';
import { PaginationDomain } from 'src/core/types';

export interface RuleEntity extends Timestampsfileds {
	id: number;
	name: string;
	description: string;
}

export interface ListRoules {
	data: Rule[];
	pagination: PaginationDomain;
}
