import { Category } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';
import { TimestampsFields } from 'src/repositories/types/timestamps';

export interface CategoryEntity extends TimestampsFields {
	id?: number;
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId?: number;
	userId: number;
	subCategories?: Category[] | CategoryEntity[];
}

export interface CategoriesEntity {
	data: CategoryEntity[] | Category[];
	pagination: Pagination;
}
