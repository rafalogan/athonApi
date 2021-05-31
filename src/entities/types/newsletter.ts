import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface INewsletter extends ITimestampsfileds {
	id: number;
	name: string;
	email: string;
	active: boolean;
}
