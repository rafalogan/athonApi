import { Schema, Document } from 'mongoose';

import { Timestampsfileds } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface MediaEntity extends Timestampsfileds {
	_id: Schema.Types.ObjectId;
	file: string;
	title: string;
	description?: string;
	type: string;
	userId: number;
}

export interface MediasListEntity {
	data: MediaEntity[];
	pagination: Pagination;
}

export interface IMediaModel extends Document {
	file: string;
	title: string;
	description: string;
	type: string;
	userId: number;
}
