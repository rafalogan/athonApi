import { Application } from 'express';

import { UserController } from 'src/api/controllers/user.controller';
import { AbstractRoutes, methodNotAllowed } from 'src/core/routes';
import { IAuthConfig } from 'src/repositories/types';

export class UserRoutes extends AbstractRoutes {
	constructor(private userController: UserController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/users')
			.all(this.auth?.authenticate())
			.get(this.userController.list.bind(this.userController))
			.post(this.userController.save.bind(this.userController))
			.all(methodNotAllowed);

		this.app
			.route('/users/:id')
			.all(this.auth?.authenticate())
			.get(this.userController.list.bind(this.userController))
			.put(this.userController.edit.bind(this.userController))
			.delete(this.userController.remove.bind(this.userController))
			.all(methodNotAllowed);
	}
}
