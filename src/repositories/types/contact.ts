import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Contact } from 'src/repositories/entities';

export interface ContactEntity extends TimestampsFields {
	id: number;
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
}

export interface ContactsEntity {
	data: ContactEntity[] | Contact[];
	pagination: Pagination;
}
