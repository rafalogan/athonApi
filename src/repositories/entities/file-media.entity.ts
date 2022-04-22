import { FileEntity, FileEntityOptions } from 'src/repositories/types';
import { setTimestampFields } from 'src/util';
import { env } from 'src/server';

const { baseUrl } = env;

export class FileMedia implements FileEntity {
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
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: FileEntity, options?: FileEntityOptions) {
		this.id = Number(options?.id ?? props.id);
		this.title = props.title;
		this.name = props.name ?? options?.file.originalname;
		this.fileName = props.fileName ?? options?.file?.key;
		this.filePath = props.filePath ?? options?.file?.path;
		this.fileType = props.fileType ?? options?.file?.mimeType;
		this.url = props.url || options?.file.location || `${baseUrl}/files/${this.fileName}`;
		this.description = props.description;
		this.alt = props.alt;
		this.categoryId = Number(props.categoryId);
		this.articleId = Number(props.articleId);
		this.userId = Number(props.userId ?? options?.userId);
		this.createdAt = setTimestampFields(props.createdAt);
		this.updatedAt = setTimestampFields(props.updatedAt);
	}
}
