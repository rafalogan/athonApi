import { Request } from 'express';
import { Knex } from 'knex';
import { S3 } from 'aws-sdk';
import { unlink } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import { AbstractDatabaseService } from 'src/core/services';
import { RedisClientType } from 'redis';
import { ReadTableOptions, RelationalServiceOptions } from 'src/core/types';
import { LoginService } from 'src/services/login.service';
import { FileMedia } from 'src/repositories/entities';
import { existsOrError, notExistisOrError } from 'src/util';
import { FilesEntity, IAWSEnvironment } from 'src/repositories/types';

const fields = [
	'id',
	'title',
	'name',
	'file_name as fileName',
	'file_path as filePath',
	'file_type as fileType',
	'url',
	'description',
	'alt',
	'category_id as categoryId',
	'article_id as articleId',
	'user_id as userId',
	'created_at as createdAt',
	'updated_at as updatedAt',
];

export class FileService extends AbstractDatabaseService {
	constructor(
		private loginService: LoginService,
		private awsEnv: IAWSEnvironment,
		conn: Knex,
		cache: RedisClientType,
		options: RelationalServiceOptions
	) {
		super(conn, cache, 'files', { ...options, fields });
	}

	setFileFields(req: Request) {
		const id = Number(req.params.id);
		const userId = this.loginService.getPayload(req)?.id;
		const file = req.file;

		return new FileMedia(req.body, { id, userId, file });
	}

	validateFields(item: FileMedia) {
		const fromDB = this.read({ id: item.id });

		notExistisOrError(fromDB, 'File already exists');
		existsOrError(item.title, 'Title is required');
		existsOrError(item.fileName, 'File name is required');
		existsOrError(item.filePath, 'File path is required');
		existsOrError(item.fileType, 'File type is required');
	}

	async create(data: FileMedia) {
		try {
			await this.validateFields(data);
		} catch (error) {
			return error;
		}

		return super.create(data);
	}

	read(options?: ReadTableOptions) {
		return super
			.read(options)
			.then(result => ('data' in result ? this.setFiles(result) : new FileMedia(result)))
			.catch(error => error);
	}

	setFiles(result: FilesEntity) {
		const data = result.data.map(item => new FileMedia(item));

		return {
			...result,
			data,
		};
	}

	async delete(id: number) {
		return this.deleteAws3(id)
			.then(() => super.delete(id))
			.catch(error => error);
	}

	private async deleteAws3(id: number) {
		const fromDB = await this.findOneById(id);
		const s3 = new S3();

		try {
			existsOrError(fromDB, 'File not found');
		} catch (error) {
			return error;
		}

		const file = new FileMedia(fromDB);

		return this.awsEnv.storageType === 's3'
			? s3
					.deleteObject({
						Bucket: this.awsEnv.bucket,
						Key: file.fileName,
					})
					.promise()
			: promisify(unlink)(resolve(__dirname, '..', '..', 'tmp', 'uploads', file.fileName));
	}
}
