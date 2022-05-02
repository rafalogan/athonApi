import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { ArticleService } from 'src/services';
import { Article } from 'src/repositories/entities';
import { DatabaseException, ResponseException } from 'src/util';
import httpStatus from 'http-status';

export class ArticleController extends AbstractController {
	constructor(private articleService: ArticleService) {
		super();
	}

	save(req: Request, res: Response) {
		const article = this.articleService.setArticle(req);

		this.articleService
			.create(article)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof ResponseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}

	edit(req: Request, res: Response) {
		const data = this.articleService.setArticle(req);

		this.articleService
			.update(Number(data.id), data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.articleService
			.read({ id, page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	listByCategory(req: Request, res: Response) {
		const categoryID = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.articleService
			.getArticlesByCategoryId(categoryID, { page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.articleService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err =>
				err instanceof DatabaseException
					? ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST })
					: ResponseController.onError(res, 'unexpected error', { err })
			);
	}
}
