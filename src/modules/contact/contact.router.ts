import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { AuthService } from 'src/services';
import { ContactController } from 'src/modules/contact/contact.controller';

export class ContactRouter extends AbstractRoutes {
	constructor(private contactController: ContactController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/contacts')
			.all(this.auth?.init().authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.post(this.contactController.save.bind(this.contactController));

		this.app
			.route('/contacts/:id')
			.all(this.auth?.init().authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.put(this.contactController.edit.bind(this.contactController))
			.delete(this.contactController.remove.bind(this.contactController));
	}
}
