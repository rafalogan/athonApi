import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { AnswerService } from 'src/services';
import { Answer } from 'src/repositories/entities';
import httpStatus from 'http-status';
import { DatabaseException, ResponseException } from 'src/util';

export class AnswerController extends AbstractController {
	constructor(private answerService: AnswerService) {
		super();
	}

	async save(req: Request, res: Response) {
		const data = new Answer(req.body);

		this.answerService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	edit(req: Request, res: Response) {
		const data = new Answer(req.body, Number(req.params.id));

		this.answerService
			.update(data.id, data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.answerService
			.read({ id, page, limit })
			.then(item => ResponseController.onSuccess(res, item))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);
		this.answerService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
