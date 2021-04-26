import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IRule extends ITimestampsfileds {
	id: number;
	name: string;
	description: string;
}
