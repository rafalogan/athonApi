import { Document } from 'mongoose';

import { MediaEntity, Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

export interface ArticleEntity extends Timestampsfileds {
	_id: any;
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: MediaEntity[];
	userId: number;
	categoryId: any;
}

export interface ArticleListEntity {
	data: ArticleEntity[];
	pagination: Pagination;
}

export interface IArticleModel extends Document {
	title: string;
	subtitle: string;
	description: string;
	content: string;
	medias: MediaEntity[];
	userId: number;
	categoryId: any;
}
