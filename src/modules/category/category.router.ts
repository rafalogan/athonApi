import { AbstractRoutes } from 'src/core/routes';
import { Application } from 'express';
import { CategoryController } from 'src/modules/category/category.controller';
import { AuthService } from 'src/services';

export class CategoryRouter extends AbstractRoutes {
	constructor(private categoryController: CategoryController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app.route('/menus').get(this.categoryController.list.bind(this.categoryController));
		this.app
			.route('/categories')
			.all(this.auth?.init().authenticate())
			.get(this.categoryController.list.bind(this.categoryController))
			.post(this.categoryController.save.bind(this.categoryController));

		this.app
			.route('/categories/:id')
			.all(this.auth?.init().authenticate())
			.get(this.categoryController.list.bind(this.categoryController))
			.post(this.categoryController.edit.bind(this.categoryController))
			.delete(this.categoryController.remove.bind(this.categoryController));
	}
}
