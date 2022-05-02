import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Newsletter } from 'src/repositories/entities';

export interface NewsletterEntity extends TimestampsFields {
	id: number;
	name: string;
	email: string;
	active: boolean;
}

export interface NewslettersEntity {
	data: NewsletterEntity[] | Newsletter[];
	pagination: Pagination;
}
