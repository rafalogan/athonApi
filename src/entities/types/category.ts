import { Schema, Document } from 'mongoose';
import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface ICategory extends ITimestampsfileds {
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
