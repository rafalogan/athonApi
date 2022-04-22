import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { FileService } from 'src/services';
import { DatabaseException, ResponseException } from 'src/util';

export class FileController extends AbstractController {
	constructor(private fileService: FileService) {
		super();
	}

	save(req: Request, res: Response) {
		const file = this.fileService.setFileFields(req);

		this.fileService
			.create(file)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	edit(req: Request, res: Response) {
		const data = this.fileService.setFileFields(req);

		this.fileService
			.update(Number(data?.id), data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.fileService
			.read({ id, page, limit })
			.then(item => ResponseController.onSuccess(res, item))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.fileService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
