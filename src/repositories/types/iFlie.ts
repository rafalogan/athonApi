import { TimestampsFields } from 'src/repositories/types/timestamps';
import { Pagination } from 'src/repositories/models';
import { FileMedia } from 'src/repositories/entities';
import { ReadTableOptions } from 'src/repositories/types/abstract-services';
import { diskStorage, DiskStorageOptions, StorageEngine } from 'multer';
import * as S3 from 'aws-sdk/clients/s3';
import { options } from 'tsconfig-paths/lib/options';

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
	baseUrl?: string;
}

export interface ReadFileOptions extends ReadTableOptions {
	articleId?: number;
	categoryId?: number;
}

export interface CustomFile extends Express.Multer.File {
	key: string;
}

export interface FilesFiledsTypes {
	images?: FileEntity[] | FileMedia[];
	videos?: FileEntity[] | FileMedia[];
	audios?: FileEntity[] | FileMedia[];
	texts?: FileEntity[] | FileMedia[];
	files?: FileEntity[] | FileMedia[];
}

interface Options {
	s3: S3;
	bucket: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void) | string;
	key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
	acl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void) | string | undefined;
	contentType?(
		req: Express.Request,
		file: Express.Multer.File,
		callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void
	): void;
	contentDisposition?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, contentDisposition?: string) => void) => void)
		| string
		| undefined;
	metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
	cacheControl?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void)
		| string
		| undefined;
	serverSideEncryption?:
		| ((req: Express.Request, file: Express.Multer.File, callback: (error: any, serverSideEncryption?: string) => void) => void)
		| string
		| undefined;
}

export interface S3Storage {
	(options?: Options): StorageEngine;

	AUTO_CONTENT_TYPE(
		req: Express.Request,
		file: Express.Multer.File,
		callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void
	): void;
	DEFAULT_CONTENT_TYPE(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string) => void): void;
}
