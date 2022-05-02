import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { NewsletterService } from 'src/services';
import { Newsletter } from 'src/repositories/entities';
import { DatabaseException, existsOrError, ResponseException } from 'src/util';

export class NewsletterController extends AbstractController {
	constructor(private newsletterService: NewsletterService) {
		super();
	}

	save(req: Request, res: Response) {
		const data = new Newsletter(req.body);

		this.newsletterService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	edit(req: Request, res: Response) {
		const data = new Newsletter(req.body, Number(req.params.id));

		this.newsletterService
			.update(data.id, data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.newsletterService
			.read({ id, page, limit })
			.then(entry => ResponseController.onSuccess(res, entry))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async unsubscribe(req: Request, res: Response) {
		const { email } = req.body;
		const fromDB = await this.newsletterService.findSubscribeByEmail(email);

		try {
			existsOrError(fromDB, `Subscription not exists for this email: ${email}`);
		} catch (err: any) {
			return ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST });
		}

		fromDB.active = false;

		this.newsletterService
			.update(fromDB.id, fromDB)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.newsletterService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
