import { Profile, Rule } from 'src/core/entities';

export interface IUser {
	id: number;
	name: string;
	email: string;
	password?: string;
	profileId: number;
	profile?: Profile;
	permissions?: Rule[];
	deleteAt?: Date;
}
