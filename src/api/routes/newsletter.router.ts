import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { LoginService } from 'src/services';
import { NewsletterController } from 'src/api/controllers/newsletter.controller';

export class NewsletterRouter extends AbstractRoutes {
	constructor(private newsletterController: NewsletterController, app: Application, auth: LoginService) {
		super(app, auth);
	}

	exec() {
		this.app.route('/newsletter/signin').post(this.newsletterController.save.bind(this.newsletterController));
		this.app.route('/newsletter/unsubscribe').post(this.newsletterController.unsubscribe.bind(this.newsletterController));

		this.app
			.route('/newsletter')
			.all(this.auth?.init().authenticate())
			.get(this.newsletterController.list.bind(this.newsletterController))
			.post(this.newsletterController.save.bind(this.newsletterController));

		this.app
			.route('/newsletter/:id')
			.all(this.auth?.init().authenticate())
			.get(this.newsletterController.list.bind(this.newsletterController))
			.put(this.newsletterController.edit.bind(this.newsletterController))
			.delete(this.newsletterController.remove.bind(this.newsletterController));
	}
}
