import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { SocialMediaService } from 'src/services';
import { SocialMedia } from 'src/entities';

export class SocialmediaController extends AbstractController {
	constructor(private socialMediaService: SocialMediaService, private responseController: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.socialMediaService.socialmediaFilter(req);

		if (!(data instanceof SocialMedia)) return this.responseController.onError(res, data.message, data);

		this.socialMediaService
			.create(data)
			.then(result => this.responseController.onSuccess(res, result))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const _id = req.params.id;
		const data = new SocialMedia(req.body, _id);

		this.socialMediaService
			.update(data, data._id)
			.then(result => this.responseController.onSuccess(res, result))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const _id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.socialMediaService
			.read({ _id, page, limit })
			.then(data =>
				this.responseController.onSuccess(
					res,
					data.pagination ? this.socialMediaService.createSocialmediaslist(data) : new SocialMedia(data)
				)
			)
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const _id = req.params.id;
			const deleted = await this.socialMediaService.delete(_id);
			return deleted?.status
				? this.responseController.onError(res, deleted.message, deleted)
				: this.responseController.onSuccess(res, deleted);
		} catch (err) {
			this.responseController.onError(res, 'unexpected error', { err });
		}
	}
}
