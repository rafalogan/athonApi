import { Schema, model } from 'mongoose';
import { ISocialMediaModel } from 'src/entities';

const SocialMediaSchema = new Schema(
	{
		label: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		visible: {
			type: Boolean,
			required: true,
			default: true,
		},
		userId: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const SocialMediaModel = model<ISocialMediaModel>('SocialMedia', SocialMediaSchema);
