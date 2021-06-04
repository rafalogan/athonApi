import { AbstractRoutes } from 'src/core/routes';
import { Application } from 'express';
import { AuthService } from 'src/services';
import { UserRuleController } from 'src/modules/user-rule/user-rule.controller';

export class UserRuleRouter extends AbstractRoutes {
	constructor(private userRuleController: UserRuleController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/user-rules')
			.all(this.auth?.init().authenticate())
			.get(this.userRuleController.list.bind(this.userRuleController))
			.post(this.userRuleController.save.bind(this.userRuleController));

		this.app
			.route('/user-rules/:id')
			.all(this.auth?.init().authenticate())
			.get(this.userRuleController.list.bind(this.userRuleController))
			.delete(this.userRuleController.remove.bind(this.userRuleController));
	}
}
