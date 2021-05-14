import { Schema, Document } from 'mongoose';

import { ITimestampsfileds } from 'src/core/entities/types/timestamps';
import { IMedia } from 'src/core/entities/types/media';

export interface IArticle extends ITimestampsfileds {
	_id: Schema.Types.ObjectId;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: IMedia[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
}

export interface IArticleModel extends Document {
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: IMedia[];
	userId: number;
	categoryId: Schema.Types.ObjectId;
}
