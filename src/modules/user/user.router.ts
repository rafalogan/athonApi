import { Application } from 'express';

import { UserController } from 'src/modules/user/user.controller';
import { AuthService } from 'src/services';
import { AbstractRoutes } from 'src/core/routes';

export class UserRouter extends AbstractRoutes {
	constructor(private userController: UserController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/users')
			.all(this.auth?.init().authenticate())
			.get(this.userController.list.bind(this.userController))
			.post(this.userController.save.bind(this.userController));

		this.app
			.route('/users/:id')
			.all(this.auth?.init().authenticate())
			.get(this.userController.list.bind(this.userController))
			.put(this.userController.edit.bind(this.userController))
			.delete(this.userController.remove.bind(this.userController));
	}
}
