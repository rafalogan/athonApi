import { Timestampsfileds } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface NewsletterEntity extends Timestampsfileds {
	id: number;
	name: string;
	email: string;
	active: boolean;
}

export interface NewsletterListEntities {
	data: NewsletterEntity[];
	pagination: Pagination;
}