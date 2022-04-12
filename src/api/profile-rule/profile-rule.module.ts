import { AuthService, ProfileRuleService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { Application } from 'express';
import { ProfileRuleController } from 'src/api/profile-rule/profile-rule.controller';
import { ProfileRuleRouter } from 'src/api/profile-rule/profile-rule.router';

export default class ProfileRuleModule {
	private profileRuleController: ProfileRuleController;
	private profileRuleRouter: ProfileRuleRouter;

	constructor(
		private profileRuleService: ProfileRuleService,
		private responseController: ResponseController,
		app: Application,
		auth: AuthService
	) {
		this.profileRuleController = new ProfileRuleController(this.profileRuleService, this.responseController);
		this.profileRuleRouter = new ProfileRuleRouter(this.profileRuleController, app, auth);
	}

	init() {
		return this.profileRuleRouter.exec();
	}
}
