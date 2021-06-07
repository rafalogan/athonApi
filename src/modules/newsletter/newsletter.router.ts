import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { AuthService } from 'src/services';
import { NewsletterController } from 'src/modules/newsletter/newsletter.controller';

export class NewsletterRouter extends AbstractRoutes {
	constructor(private newsletterController: NewsletterController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app.route('/newsletter/signin').post(this.newsletterController.save.bind(this.newsletterController));
		this.app.route('/newsletter/cancel/:id').post(this.newsletterController.edit.bind(this.newsletterController));

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
