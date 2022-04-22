import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Pagination } from 'src/repositories/models';
import { FileMedia } from 'src/repositories/entities';

export interface FileEntity extends TimestampsFields {
	id?: number;
	title: string;
	name: string;
	fileName: string;
	filePath: string;
	fileType: string;
	url: string;
	description?: string;
	alt?: string;
	categoryId?: number;
	articleId?: number;
	userId: number;
}

export interface FilesEntity {
	data: FileEntity[] | FileMedia[];
	pagination: Pagination;
}

export interface FileEntityOptions {
	id?: number;
	userId?: number;
	file?: any;
}

export interface CustomFile extends Express.Multer.File {
	key: string;
}
