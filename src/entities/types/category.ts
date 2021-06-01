import { Schema, Document } from 'mongoose';

import { Timestampsfileds } from 'src/entities';

export interface CategoryEntity extends Timestampsfileds {
	_id: Schema.Types.ObjectId;
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId: Schema.Types.ObjectId;
	userId: number;
}

export interface ICategoryModel extends Document {
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId: Schema.Types.ObjectId;
	userId: number;
}
