import { Application } from 'express';

import { UserController } from 'src/api/controllers/user.controller';
import { AbstractRoutes, methodNotAllowed } from 'src/core/routes';
import { IAuthConfig } from 'src/repositories/types';
import { UserRuleController } from 'src/api/controllers';

export class UserRoutes extends AbstractRoutes {
	constructor(private userController: UserController, private userRuleController: UserRuleController, app: Application, auth: IAuthConfig) {
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
			.route('/users/rules')
			.all(this.auth?.authenticate())
			.get(this.userRuleController.list.bind(this.userRuleController))
			.post(this.userRuleController.save.bind(this.userRuleController));

		this.app
			.route('/users/rules/:id')
			.all(this.auth?.authenticate())
			.get(this.userRuleController.list.bind(this.userRuleController))
			.delete(this.userRuleController.remove.bind(this.userRuleController));

		this.app
			.route('/users/:id')
			.all(this.auth?.authenticate())
			.get(this.userController.list.bind(this.userController))
			.put(this.userController.edit.bind(this.userController))
			.delete(this.userController.remove.bind(this.userController))
			.all(methodNotAllowed);
	}
}
