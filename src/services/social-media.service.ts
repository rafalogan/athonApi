import { Request } from 'express';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { SocialMedia } from 'src/repositories/entities';
import { clearTimestampFields, existsOrError, notExistisOrError } from 'src/util';
import { AbstractDatabaseService } from 'src/core/services';
import { ReadTableOptions, RelationalServiceOptions } from 'src/core/types';
import { LoginService } from 'src/services/login.service';
import { SocialMediaEntity, SocialMediasEntity } from 'src/repositories/types';

const fields = ['id', 'title', 'url', 'icon_name  as iconName', 'user_id as userId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class SocialMediaService extends AbstractDatabaseService {
	constructor(private loginService: LoginService, conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'social_medias', { ...options, fields });
	}

	async setSocialMedia(req: Request): Promise<SocialMedia> {
		const userId = await this.loginService.getPayload(req)?.id;
		const id = Number(req.params.id);

		return new SocialMedia(req.body, id, userId);
	}

	async socialMediaValidate(data: SocialMedia) {
		const fromDB = await this.read({ id: data.id });

		notExistisOrError(fromDB, 'Social media already exists');
		existsOrError(data.title, 'Field title is required.');
		existsOrError(data.url, 'Field url is required.');
	}

	async create(data: SocialMedia) {
		try {
			await this.socialMediaValidate(data);
		} catch (error) {
			return error;
		}

		return super.create(data);
	}

	read(options?: ReadTableOptions) {
		return super
			.read(options)
			.then((result: SocialMediasEntity | SocialMediaEntity) => ('data' in result ? this.setSocialMedias(result) : new SocialMedia(result)))
			.catch(err => err);
	}

	private setSocialMedias(socialMedias: SocialMediasEntity) {
		const data = socialMedias.data.map(item => new SocialMedia(item)).map(clearTimestampFields);

		return {
			...socialMedias,
			data,
		};
	}
}
