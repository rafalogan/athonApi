import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IProfile extends ITimestampsfileds {
	id: number;
	title: string;
	description: string;
}
