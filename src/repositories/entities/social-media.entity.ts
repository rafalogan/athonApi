import { SocialMediaEntity } from 'src/repositories/types';

export class SocialMedia implements SocialMediaEntity {
	id?: any;
	title: string;
	url: string;
	iconName: string;
	userId?: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(params: SocialMediaEntity | SocialMedia, id?: number, userId?: number) {
		this.id = Number(id ?? params.id);
		this.title = params.title;
		this.url = params.url;
		this.iconName = params.iconName;
		this.userId = Number(userId || params?.userId);
		this.createdAt = params?.createdAt;
		this.updatedAt = params?.updatedAt;
	}
}
