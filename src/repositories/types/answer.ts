import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Pagination } from 'src/core/domains';

export interface AnswerEntity extends TimestampsFields {
	id?: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
}

export interface AnswerListEntity {
	data: AnswerEntity[];
	pagination: Pagination;
}
