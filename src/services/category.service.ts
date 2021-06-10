import httpStatus from 'http-status';
import { Request } from 'express';

import { NoRelationalServiceOptions } from 'src/core/types';
import { CategoriesListEntity, Category, CategoryEntity, ICategoryModel } from 'src/entities';
import { AbstractNoRelationalService } from 'src/core/services';
import { existsOrError, ResponseException } from 'src/util';
import { AuthService } from 'src/services/auth.service';

export class CategoryService extends AbstractNoRelationalService<ICategoryModel> {
	constructor(private authService: AuthService, options: NoRelationalServiceOptions) {
		super({ ...options, serviceName: CategoryService.name });
	}

	setFields(req: Request) {
		try {
			const raw: CategoryEntity = req.body;
			const payload = this.authService.getPayload(req);
			raw.userId = raw.userId ?? payload?.id;

			existsOrError(raw.name, 'Field Name is required.');
			existsOrError(raw.status, 'Field Status is required.');
			existsOrError(payload, 'User Token invalid');

			return new Category(raw);
		} catch (message) {
			const err = new ResponseException(message);
			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	setCategoriesList(raw: CategoriesListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new Category(item));

		return { data: this._getToTree(data), pagination };
	}

	private _getToTree(categories: Category[], tree?: Category[]) {
		let result;
		if (!tree) result = categories.filter(root => !root.parentId);

		result = result?.map(root => {
			const isChild = (node: Category) => node.parentId === root._id;
			root.subCategories = this._getToTree(categories, categories.filter(isChild));
			return root;
		});

		return result;
	}
}
