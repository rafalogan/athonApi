import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface IAnswer extends ITimestampsfileds {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
}
