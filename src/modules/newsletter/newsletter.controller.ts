import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { NewsletterService } from 'src/services';
import { Newsletter } from 'src/entities';

export class NewsletterController extends AbstractController {
	constructor(private newsletterService: NewsletterService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.newsletterService.fieldsFilter(req.body);

		if (!(data instanceof Newsletter)) return this.response.onError(res, data.message, data);

		this.newsletterService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const data = new Newsletter(req.body, Number(req.params.id));

		this.newsletterService
			.update(data, data.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.newsletterService
			.read({ id, page, limit })
			.then(entry => this.response.onSuccess(res, entry.data ? this.newsletterService.renderList(entry) : new Newsletter(entry)))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const deleted = await this.newsletterService.delete(id);

			return deleted.status ? this.response.onError(res, deleted.message, deleted) : this.response.onSuccess(res, deleted);
		} catch (err) {
			this.response.onError(res, 'unexpected error', { err });
		}
	}
}
