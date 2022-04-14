import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { ArticleController } from 'src/api/article/article.controller';
import { LoginService } from 'src/services';

export class ArticleRouter extends AbstractRoutes {
	constructor(private articleController: ArticleController, app: Application, auth: LoginService) {
		super(app, auth);
	}

	exec() {
		this.app.route('/articles').get(this.articleController.list.bind(this.articleController));
		this.app.route('/articles/category/:id').get(this.articleController.listByCategory.bind(this.articleController));

		this.app.route('/articles').all(this.auth?.init().authenticate()).post(this.articleController.save.bind(this.articleController));

		this.app
			.route('/articles/:id')
			.all(this.auth?.init().authenticate())
			.get(this.articleController.list.bind(this.articleController))
			.put(this.articleController.edit.bind(this.articleController))
			.delete(this.articleController.remove.bind(this.articleController));
	}
}
