import { Schema } from 'mongoose';

import { IArticle } from 'src/core/entities/types/article';
import { IMedia } from 'src/core/entities/types/media';

export class Article implements IArticle {
	_id: Schema.Types.ObjectId;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: IMedia[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IArticle, id: Schema.Types.ObjectId) {
		this._id = id || props._id;
		this.title = props.title;
		this.subtitle = props.subtitle;
		this.description = props.description;
		this.content = props.content;
		this.medias = props.medias;
		this.userId = props.userId;
		this.categoryId = props.categoryId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
