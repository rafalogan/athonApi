import { FileEntity, FileEntityOptions } from 'src/repositories/types';
import { setTimestampFields } from 'src/util';

export class FileMedia implements FileEntity {
	id?: number;
	title: string;
	fileName: string;
	filePath: string;
	fileType: string;
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
		this.fileName = props.fileName ?? options?.file?.name;
		this.filePath = props.filePath ?? options?.file?.path;
		this.fileType = props.fileType ?? options?.file?.type;
		this.description = props.description;
		this.alt = props.alt;
		this.categoryId = Number(props.categoryId);
		this.articleId = Number(props.articleId);
		this.userId = Number(props.userId ?? options?.userId);
		this.createdAt = setTimestampFields(props.createdAt);
		this.updatedAt = setTimestampFields(props.updatedAt);
	}
}
