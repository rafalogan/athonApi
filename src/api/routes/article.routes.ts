import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { ArticleController } from 'src/api/controllers/article.controller';
import { IAuthConfig } from 'src/repositories/types';

export class ArticleRoutes extends AbstractRoutes {
	constructor(private articleController: ArticleController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/articles')
			.get(this.articleController.list.bind(this.articleController))
			.all(this.auth?.authenticate())
			.post(this.articleController.save.bind(this.articleController));

		this.app.route('/articles/category/:id').get(this.articleController.listByCategory.bind(this.articleController));

		this.app
			.route('/articles/:id')
			.all(this.auth?.authenticate())
			.get(this.articleController.list.bind(this.articleController))
			.put(this.articleController.edit.bind(this.articleController))
			.delete(this.articleController.remove.bind(this.articleController));
	}
}
