import { CreatedAtField } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface ContactEntity extends CreatedAtField {
	id: number;
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
}

export interface ContactListEntity {
	data: ContactEntity[];
	pagination: Pagination;
}
