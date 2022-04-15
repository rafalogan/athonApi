import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { SocialmediaController } from 'src/api/controllers/socialmedia.controller';
import { LoginService } from 'src/services';

export class SocialmediaRouter extends AbstractRoutes {
	constructor(private socialmediaController: SocialmediaController, app: Application, auth: LoginService) {
		super(app, auth);
	}

	exec() {
		this.app.route('/socialmedias').get(this.socialmediaController.list.bind(this.socialmediaController));
		this.app
			.route('/socialmedias')
			.all(this.auth?.init().authenticate())
			.post(this.socialmediaController.save.bind(this.socialmediaController));

		this.app
			.route('/socialmedias/:id')
			.all(this.auth?.init().authenticate())
			.get(this.socialmediaController.list.bind(this.socialmediaController))
			.put(this.socialmediaController.edit.bind(this.socialmediaController))
			.delete(this.socialmediaController.remove.bind(this.socialmediaController));
	}
}
