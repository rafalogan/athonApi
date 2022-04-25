import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { SocialMediaService } from 'src/services';
import { SocialMedia } from 'src/repositories/entities';
import { DatabaseException, ResponseException } from 'src/util';

export class SocialMediaController extends AbstractController {
	constructor(private socialMediaService: SocialMediaService) {
		super();
	}

	async save(req: Request, res: Response) {
		const data = await this.socialMediaService.setSocialMedia(req);

		this.socialMediaService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	async edit(req: Request, res: Response) {
		const data = await this.socialMediaService.setSocialMedia(req);

		this.socialMediaService
			.update(data.id, data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.socialMediaService
			.read({ id, page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.socialMediaService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
