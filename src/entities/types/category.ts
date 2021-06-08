import { Schema, Document } from 'mongoose';

import { Category, Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

export interface CategoryEntity extends Timestampsfileds {
	_id: Schema.Types.ObjectId;
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId: Schema.Types.ObjectId;
	userId: number;
	subCategories?: Category[];
}

export interface CategoriesListEntity {
	data: CategoryEntity[];
	pagination: Pagination;
}

export interface ICategoryModel extends Document {
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId: Schema.Types.ObjectId;
	userId: number;
}
