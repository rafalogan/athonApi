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

	edit(req: Request, res: Response) {}

	list(req: Request, res: Response) {}

	remove(req: Request, res: Response) {}
}
