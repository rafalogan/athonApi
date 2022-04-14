import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Pagination } from 'src/repositories/models';
import { Rule } from 'src/repositories/entities';
import { RuleEntity } from 'src/repositories/types/rule';
import { PaginationDomain } from 'src/core/types';

export interface ProfileEntity extends TimestampsFields {
	id?: number;
	title: string;
	description: string;
	permissions?: Rule[] | RuleEntity[];
}

export interface ProfilesList {
	data: ProfileEntity[];
	pagination: Pagination | PaginationDomain;
}
