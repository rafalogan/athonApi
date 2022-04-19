import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Pagination } from 'src/repositories/models';
import { Answer } from 'src/repositories/entities';

export interface AnswerEntity extends TimestampsFields {
	id?: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
}

export interface AnswerstEntity {
	data: AnswerEntity[] | Answer[];
	pagination: Pagination;
}
