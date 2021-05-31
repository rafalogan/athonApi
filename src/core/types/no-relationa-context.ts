import mongoose from 'mongoose';

export interface INoRelationaContext {
	create: (value: any) => Promise<any | void>;
	read: (options: NoRelationalReadOptions, _id?: mongoose.Types.ObjectId) => Promise<any>;
	update: (values: any, _id: mongoose.Types.ObjectId) => Promise<any | void>;
	delete: (_id: mongoose.Types.ObjectId) => Promise<any | void>;
}

export interface NoRelationalReadOptions {
	id?: any;
	page?: number;
	limit?: number;
}
