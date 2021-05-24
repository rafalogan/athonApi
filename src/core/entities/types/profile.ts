import { ITimestampsfileds, Rule } from 'src/core/entities';

export interface IProfile extends ITimestampsfileds {
	id: number;
	title: string;
	description: string;
	permissions?: Rule[];
}
