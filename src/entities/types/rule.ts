import { Timestampsfileds } from 'src/entities';

export interface RuleEntity extends Timestampsfileds {
	id: number;
	name: string;
	description: string;
}
