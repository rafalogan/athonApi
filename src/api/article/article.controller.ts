import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { ArticleService } from 'src/services';
import { Article } from 'src/repositories/entities';

export class ArticleController extends AbstractController {
	constructor(private articleService: ArticleService, private responseController: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.articleService.articleFilter(req);

		if (!(data instanceof Article)) return this.responseController.onError(res, data.message, data);

		this.articleService
			.create(data)
			.then(result => this.responseController.onSuccess(res, result))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const _id = req.params.id;
		const data = new Article(req.body, _id);

		this.articleService
			.update(data, data._id)
			.then(result => this.responseController.onSuccess(res, result))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const _id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.articleService
			.read({ _id, page, limit })
			.then(raw => this.responseController.onSuccess(res, raw.data ? this.articleService.creatListAitcles(raw) : new Article(raw)))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	listByCategory(req: Request, res: Response) {
		const categoryID = req.params.id;

		this.articleService
			.articlesByCategoryId(categoryID)
			.then(data => this.responseController.onSuccess(res, data))
			.catch(err => this.responseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const _id = req.params.id;
			const deleted = await this.articleService.delete(_id);

			return deleted?.status
				? this.responseController.onError(res, deleted.message, deleted)
				: this.responseController.onSuccess(res, deleted);
		} catch (err) {
			this.responseController.onError(res, 'unexpected error', { err });
		}
	}
}
