import { Request } from 'express';

import { IMediaModel, Media, MediaEntity, MediasListEntity } from 'src/entities';
import { AbstractNoRelationalService } from 'src/core/services';
import { NoRelationalServiceOptions } from 'src/core/types';
import { existsOrError, ResponseException } from 'src/util';
import { AuthService } from 'src/services/auth.service';
import httpStatus from 'http-status';

export class MediaService extends AbstractNoRelationalService<IMediaModel> {
	constructor(private authService: AuthService, options: NoRelationalServiceOptions) {
		super({ ...options, serviceName: MediaService.name });
	}

	filterFields(req: Request) {
		try {
			const raw: MediaEntity = req.body;
			const payload = this.authService.getPayload(req);
			raw.userId = raw.userId ?? payload?.id;

			existsOrError(raw.file, 'File is a required field.');
			existsOrError(raw.title, 'Title is a required field.');
			existsOrError(raw.type, 'Type is a required field.');
			existsOrError(raw.file, 'File is a required field.');

			return new Media(raw);
		} catch (message) {
			const err = new ResponseException(message);

			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	createMediasList(raw: MediasListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(media => new Media(media));
		return { data, pagination };
	}
}
