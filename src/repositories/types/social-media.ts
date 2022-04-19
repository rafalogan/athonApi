import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';
import { SocialMedia } from 'src/repositories/entities';

export interface SocialMediaEntity extends TimestampsFields {
	id?: any;
	title: string;
	url: string;
	iconName: string;
	userId?: number;
}

export interface SocialMediasEntity {
	data: SocialMediaEntity[] | SocialMedia[];
	pagination: Pagination;
}
