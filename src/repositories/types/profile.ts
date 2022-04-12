import { Rule, Timestampsfileds } from 'src/repositories/entities';

export interface ProfileEntity extends Timestampsfileds {
	id: number;
	title: string;
	description: string;
	permissions?: Rule[];
}
