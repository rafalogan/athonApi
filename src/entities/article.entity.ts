import { Schema } from 'mongoose';

import { ArticleEntity, MediaEntity } from 'src/entities';

export class Article implements ArticleEntity {
	_id: Schema.Types.ObjectId;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: MediaEntity[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(params: ArticleEntity, id?: any) {
		this._id = id ?? params._id;
		this.title = params.title;
		this.subtitle = params.subtitle;
		this.description = params.description;
		this.content = params.content;
		this.medias = params.medias;
		this.userId = params.userId;
		this.categoryId = params.categoryId;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
	}
}
