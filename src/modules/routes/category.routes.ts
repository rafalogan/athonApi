import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { CategoryController } from 'src/api/controllers/category.controller';
import { IAuthConfig } from 'src/repositories/types';

export class CategoryRoutes extends AbstractRoutes {
	constructor(private categoryController: CategoryController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/categories')
			.all(this.auth?.authenticate())
			.get(this.categoryController.list.bind(this.categoryController))
			.post(this.categoryController.save.bind(this.categoryController));

		this.app
			.route('/categories/:id')
			.all(this.auth?.authenticate())
			.get(this.categoryController.list.bind(this.categoryController))
			.post(this.categoryController.edit.bind(this.categoryController))
			.delete(this.categoryController.remove.bind(this.categoryController));
	}
}
