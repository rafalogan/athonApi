import { Schema, model } from 'mongoose';

import { IArticleModel } from 'src/entities';
import { SocialMediaModel } from 'src/schemas/social-media.model';

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
			type: [SocialMediaModel],
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
