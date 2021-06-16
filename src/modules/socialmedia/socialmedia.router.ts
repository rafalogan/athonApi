import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { SocialmediaController } from 'src/modules/socialmedia/socialmedia.controller';
import { AuthService } from 'src/services';

export class SocialmediaRouter extends AbstractRoutes {
	constructor(private socialmediaController: SocialmediaController, app: Application, auth: AuthService) {
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
