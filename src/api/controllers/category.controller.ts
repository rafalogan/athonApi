import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { CategoryService } from 'src/services';
import { Category } from 'src/repositories/entities';

export class CategoryController extends AbstractController {
	constructor(private categoryService: CategoryService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.categoryService.setFields(req);

		if (!(data instanceof Category)) return this.response.onError(res, data.message, data);

		this.categoryService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const category = new Category(req.body);

		this.categoryService
			.update(category, category._id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const _id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.categoryService
			.read({ _id, page, limit })
			.then(item => this.response.onSuccess(res, item.data ? this.categoryService.setCategoriesList(item) : new Category(item)))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const _id = req.params.id;
			const deleted = await this.categoryService.delete(_id);

			return deleted?.status ? this.response.onError(res, deleted?.message, deleted) : this.response.onSuccess(res, deleted);
		} catch (err) {
			this.response.onError(res, 'unexpected error', { err });
		}
	}
}
