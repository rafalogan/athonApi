import { Application } from 'express';
import { ArticleService, AuthService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { ArticleController } from 'src/modules/article/article.controller';
import { ArticleRouter } from 'src/modules/article/article.router';

export default class ArticleModule {
	private readonly articleController: ArticleController;
	private articleRouter: ArticleRouter;

	constructor(articleService: ArticleService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.articleController = new ArticleController(articleService, responseController);
		this.articleRouter = new ArticleRouter(this.articleController, app, auth);
	}

	init() {
		return this.articleRouter.exec();
	}
}
