import { Schema, Document } from 'mongoose';

import { Timestampsfileds } from 'src/entities';

export interface IMedia extends Timestampsfileds {
	_id: Schema.Types.ObjectId;
	file: string;
	title: string;
	description: string;
	type: string;
	userId: number;
}

export interface IMediaModel extends Document {
	file: string;
	title: string;
	description: string;
	type: string;
	userId: number;
}
