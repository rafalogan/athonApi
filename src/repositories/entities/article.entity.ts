import { ArticleEntity, FileEntity } from 'src/repositories/types';
import { FileMedia } from 'src/repositories/entities/file-media.entity';
import { setFilesMeda, setTimestampFields } from 'src/util';

export class Article implements ArticleEntity {
	id?: number;
	title: string;
	subtitle?: string;
	description: string;
	content: string;
	userId: number;
	categoryId: number;
	images?: FileEntity[] | FileMedia[];
	videos?: FileEntity[] | FileMedia[];
	files?: FileEntity[] | FileMedia[];
	createdAt?: Date;
	updatedAt?: Date;

	constructor(params: ArticleEntity, id?: number, userId?: number) {
		this.id = Number(params.id || id);
		this.title = params.title;
		this.subtitle = params.subtitle;
		this.description = params.description;
		this.content = params.content;
		this.userId = Number(params.userId ?? userId);
		this.categoryId = Number(params.categoryId);
		this.images = setFilesMeda(params.images);
		this.videos = setFilesMeda(params.videos);
		this.files = setFilesMeda(params.files);
		this.createdAt = setTimestampFields(params.createdAt);
		this.updatedAt = setTimestampFields(params.updatedAt);
	}
}
