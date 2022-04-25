import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { CategoryService } from 'src/services';
import { DatabaseException, ResponseException } from 'src/util';
import httpStatus from 'http-status';

export class CategoryController extends AbstractController {
	constructor(private categoryService: CategoryService) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.categoryService.setCategory(req);

		this.categoryService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	edit(req: Request, res: Response) {
		const category = this.categoryService.setCategory(req);

		this.categoryService
			.update(Number(category?.id), category)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.categoryService
			.read({ id, page, limit })
			.then(item => ResponseController.onSuccess(res, item))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		return this.categoryService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
