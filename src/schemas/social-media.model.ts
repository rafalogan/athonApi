import { Schema, model } from 'mongoose';

const SocialMediaSchema = new Schema(
	{
		name: {
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

const SocialMediaModel = model('SocialMedia', SocialMediaSchema);

export default SocialMediaModel;
