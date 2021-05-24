import { Profile, Rule } from 'src/core/entities';

export interface IPayload {
	id: number;
	name: string;
	email: string;
	profile?: Profile;
	permissions?: Rule[];
	iat: number;
	exp: number;
}
