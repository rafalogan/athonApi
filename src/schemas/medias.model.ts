import { Schema, model } from 'mongoose';

const MediasSchema = new Schema(
	{
		file: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			maxlength: 1000,
			required: false,
		},
		type: {
			type: String,
			required: true,
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

const MediasModel = model('Medias', MediasSchema);

export default MediasModel;
