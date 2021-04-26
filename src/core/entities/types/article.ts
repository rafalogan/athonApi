import { Schema } from 'mongoose';

import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IArticle extends ITimestampsfileds {
	_id: Schema.Types.ObjectId;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: Schema.Types.ObjectId;
	userId: number;
	categoryId: Schema.Types.ObjectId;
}
