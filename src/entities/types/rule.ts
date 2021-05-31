import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface IRule extends ITimestampsfileds {
	id: number;
	name: string;
	description: string;
}
