import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { MediaService } from 'src/services';
import { Media } from 'src/entities';

export class MediaController extends AbstractController {
	constructor(private mediaService: MediaService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const media = this.mediaService.filterFields(req);

		if (!(media instanceof Media)) return this.response.onError(res, media.message, media);

		this.mediaService
			.create(media)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const _id = req.params.id;
		const data = new Media(req.body, _id);

		this.mediaService
			.update(data, data._id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const _id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.mediaService
			.read({ _id, page, limit })
			.then(item => this.response.onSuccess(res, item.data ? this.mediaService.createMediasList(item) : new Media(item)))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const _id = req.params.id;
			const deleted = await this.mediaService.delete(_id);

			return deleted?.status ? this.response.onError(res, deleted?.message, deleted) : this.response.onSuccess(res, deleted);
		} catch (err) {
			this.response.onError(res, 'unexpected error', { err });
		}
	}
}
