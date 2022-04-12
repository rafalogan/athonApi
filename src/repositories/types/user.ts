import { Profile, Rule, RuleEntity, User } from 'src/repositories/entities';
import { PaginationDomain } from 'src/core/domains';

export interface UserEntity {
	id: number;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	profileId: number;
	profile?: Profile;
	permissions?: Rule[] | RuleEntity[];
	deleteAt?: Date;
}

export interface ListUsers {
	data: User[];
	pagination: PaginationDomain;
}
