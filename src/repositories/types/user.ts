import { Profile, Rule, User } from 'src/repositories/entities';
import { RuleEntity } from 'src/repositories/types/rule';
import { PaginationDomain } from 'src/core/types';

export interface UserEntity {
	id?: number;
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
