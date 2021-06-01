import { Profile, Rule } from 'src/entities';

export interface UserEntity {
	id: number;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	profileId: number;
	profile?: Profile;
	permissions?: Rule[];
	deleteAt?: Date;
}
