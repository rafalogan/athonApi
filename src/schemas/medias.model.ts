import { Schema, model } from 'mongoose';
import { IMediaModel } from 'src/entities';

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

export const MediasModel = model<IMediaModel>('Medias', MediasSchema);
