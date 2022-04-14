import { Profile, Rule, User } from 'src/repositories/entities';
import { RuleEntity } from 'src/repositories/types/rule';
import { PaginationDomain } from 'src/core/types';
import { Pagination } from 'src/repositories/models';
import { ProfileEntity } from 'src/repositories/types/profile';

export interface UserEntity {
	id?: number;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	profileId: number;
	profile?: Profile | ProfileEntity;
	permissions?: Rule[] | RuleEntity[];
	deleteAt?: Date;
}

export interface UsersEntity {
	data: User[] | UserEntity[];
	pagination: PaginationDomain | Pagination;
}
