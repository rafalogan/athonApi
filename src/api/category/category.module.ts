import { Application } from 'express';

import { CategoryController } from 'src/api/category/category.controller';
import { CategoryRouter } from 'src/api/category/category.router';
import { AuthService, CategoryService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class CategoryModule {
	private categoryController: CategoryController;
	private categoryRouter: CategoryRouter;

	constructor(categoryService: CategoryService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.categoryController = new CategoryController(categoryService, responseController);
		this.categoryRouter = new CategoryRouter(this.categoryController, app, auth);
	}

	init() {
		return this.categoryRouter.exec();
	}
}
