import { NoRelationalServiceOptions } from 'src/core/types';
import { ISocialMediaModel, SocialMedia, SocialmediaEntity, SocialmediaListEntity } from 'src/entities';
import { AbstractNoRelationalService } from 'src/core/services';
import { clearTimestamp, existsOrError, ResponseException } from 'src/util';
import httpStatus from 'http-status';
import { Request } from 'express';
import { AuthService } from 'src/services/auth.service';

export class SocialMediaService extends AbstractNoRelationalService<ISocialMediaModel> {
	constructor(private authService: AuthService, options: NoRelationalServiceOptions) {
		super({ ...options, serviceName: SocialMediaService.name });
	}

	socialmediaFilter(req: Request) {
		try {
			const data: SocialmediaEntity = req.body;
			data.userId = Number(data.userId || this.authService.getPayload(req)?.id);

			existsOrError(data.label, 'Field label is required.');
			existsOrError(data.url, 'Field url is required.');
			existsOrError(data.visible, 'Field url is required.');

			return new SocialMedia(data);
		} catch (message) {
			const err = new ResponseException(message);

			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	createSocialmediaslist(raw: SocialmediaListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new SocialMedia(item)).map(clearTimestamp);

		return { data, pagination };
	}
}
