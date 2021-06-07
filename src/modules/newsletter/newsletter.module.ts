import { Application } from 'express';

import { NewsletterController } from 'src/modules/newsletter/newsletter.controller';
import { NewsletterRouter } from 'src/modules/newsletter/newsletter.router';
import { AuthService, NewsletterService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class NewsletterModule {
	private newsletterController: NewsletterController;
	private newsletterRouter: NewsletterRouter;
	constructor(newsletterService: NewsletterService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.newsletterController = new NewsletterController(newsletterService, responseController);
		this.newsletterRouter = new NewsletterRouter(this.newsletterController, app, auth);
	}

	init() {
		return this.newsletterRouter.exec();
	}
}
