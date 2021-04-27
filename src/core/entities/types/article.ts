import { Schema, Document } from 'mongoose';

import { ITimestampsfileds } from 'src/core/entities/types/timestamps';
import { ISocialMedia } from 'src/core/entities/types/social-media';

export interface IArticle extends ITimestampsfileds {
	_id: Schema.Types.ObjectId;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: ISocialMedia[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
}

export interface IArticleModel extends Document {
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: ISocialMedia[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
}
