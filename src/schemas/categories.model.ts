import { Schema, model } from 'mongoose';
import { ICategoryModel } from 'src/entities';

const CategoriesSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			maxlength: 1000,
			required: false,
		},
		url: {
			type: String,
			required: false,
		},
		status: {
			type: Boolean,
			required: true,
			default: true,
		},
		parentId: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
			required: false,
			select: false,
		},
		userId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export const CategoriesModel = model<ICategoryModel>('Categories', CategoriesSchema);
