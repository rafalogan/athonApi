import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface INewsletter extends ITimestampsfileds {
	id: number;
	name: string;
	email: string;
	active: boolean;
}
