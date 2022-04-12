import { Contact, Timestampsfileds } from 'src/repositories/entities';
import { Pagination } from 'src/core/domains';

export interface AnswerEntity extends Timestampsfileds {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
	contact?: Contact | void;
}

export interface AnswerListEntity {
	data: AnswerEntity[];
	pagination: Pagination;
}
