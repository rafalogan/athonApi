import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Article } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';
import { FilesFiledsTypes } from 'src/repositories/types/iFlie';

export interface ArticleEntity extends TimestampsFields, FilesFiledsTypes {
	id?: number;
	title: string;
	subtitle?: string;
	description: string;
	content: string;
	userId: number;
	categoryId: number;
}

export interface ArticlestEntity {
	data: ArticleEntity[] | Article[];
	pagination: Pagination;
}
