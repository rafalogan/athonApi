import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { NewsletterService } from 'src/services';

export class NewsletterController extends AbstractController {
	constructor(private newsletterService: NewsletterService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {}

	edit(req: Request, res: Response) {}

	list(req: Request, res: Response) {}

	remove(req: Request, res: Response) {}
}
