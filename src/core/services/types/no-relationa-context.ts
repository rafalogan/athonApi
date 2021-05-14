import mongoose from 'mongoose';
import { IPaginationOptions } from 'src/core/services/types/pagination';

export interface INoRelationaContext {
	create: (value: any) => Promise<any | void>;
	read: (options: IPaginationOptions, _id?: mongoose.Types.ObjectId) => Promise<any>;
	update: (values: any, _id: mongoose.Types.ObjectId) => Promise<any | void>;
	delete: (_id: mongoose.Types.ObjectId) => Promise<any | void>;
}
