import { Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

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
