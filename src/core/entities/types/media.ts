import { Schema, Document } from 'mongoose';

import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IMedia extends ITimestampsfileds {
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
