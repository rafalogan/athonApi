import { Schema, model } from 'mongoose';

import { IArticleModel } from 'src/entities';
import { MediasSchema } from 'src/schemas/medias.model';

const ArticlesSchema = new Schema(
	{
		title: {
			type: String,
			required: false,
		},
		subtitle: {
			type: String,
			maxlength: 300,
			required: false,
		},
		description: {
			type: String,
			maxlength: 1000,
			required: false,
		},
		content: {
			type: String,
			required: true,
		},
		medias: {
			type: [MediasSchema],
			required: false,
			select: false,
			default: [],
		},
		userId: {
			type: Number,
			required: true,
		},
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
			required: true,
		},
	},
	{ timestamps: true }
);

export const ArticlesModel = model<IArticleModel>('Articles', ArticlesSchema);
