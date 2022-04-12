import { Profile, Rule } from 'src/repositories/entities';

export interface PayloadDomain {
	id: number;
	name: string;
	email: string;
	profile?: Profile;
	permissions?: Rule[];
	iat: number;
	exp: number;
}
