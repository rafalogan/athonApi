import { Application } from 'express';

import { ResponseController } from 'src/core/controller';
import { AuthService, UserRuleService } from 'src/services';
import { UserRuleController } from 'src/api/user-rule/user-rule.controller';
import { UserRuleRouter } from 'src/api/user-rule/user-rule.router';

export default class UserRuleModule {
	private userRuleController: UserRuleController;
	private userRuleRouter: UserRuleRouter;

	constructor(
		private userRulsService: UserRuleService,
		private responseController: ResponseController,
		app: Application,
		auth: AuthService
	) {
		this.userRuleController = new UserRuleController(this.userRulsService, this.responseController);
		this.userRuleRouter = new UserRuleRouter(this.userRuleController, app, auth);
	}

	init() {
		return this.userRuleRouter.exec();
	}
}
