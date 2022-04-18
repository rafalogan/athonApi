import { AbstractRoutes } from 'src/core/routes';
import { Application } from 'express';
import { CategoryController } from 'src/api/controllers/category.controller';
import { LoginService } from 'src/services';

export class CategoryRouter extends AbstractRoutes {
	constructor(private categoryController: CategoryController, app: Application, auth: LoginService) {
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
