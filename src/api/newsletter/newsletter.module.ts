import { Application } from 'express';

import { NewsletterController } from 'src/api/newsletter/newsletter.controller';
import { NewsletterRouter } from 'src/api/newsletter/newsletter.router';
import { LoginService, NewsletterService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class NewsletterModule {
	private newsletterController: NewsletterController;
	private newsletterRouter: NewsletterRouter;
	constructor(newsletterService: NewsletterService, responseController: ResponseController, app: Application, auth: LoginService) {
		this.newsletterController = new NewsletterController(newsletterService, responseController);
		this.newsletterRouter = new NewsletterRouter(this.newsletterController, app, auth);
	}

	init() {
		return this.newsletterRouter.exec();
	}
}
