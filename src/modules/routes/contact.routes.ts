import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { ContactController } from 'src/api/controllers/contact.controller';
import { IAuthConfig } from 'src/repositories/types';

export class ContactRoutes extends AbstractRoutes {
	constructor(private contactController: ContactController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/contacts')
			.all(this.auth?.authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.post(this.contactController.save.bind(this.contactController));

		this.app
			.route('/contacts/:id')
			.all(this.auth?.authenticate())
			.get(this.contactController.list.bind(this.contactController))
			.put(this.contactController.edit.bind(this.contactController))
			.delete(this.contactController.remove.bind(this.contactController));
	}
}
