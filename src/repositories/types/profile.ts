import { Rule } from 'src/repositories/entities';
import { TimestampsFields } from 'src/repositories/types/timestamps';

export interface ProfileEntity extends TimestampsFields {
	id?: number;
	title: string;
	description: string;
	permissions?: Rule[];
}
