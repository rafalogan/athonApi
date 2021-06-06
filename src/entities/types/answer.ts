import { Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

export interface AnswerEntity extends Timestampsfileds {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
}

export interface AnswerListEntity {
	data: AnswerEntity[];
	pagination: Pagination;
}
