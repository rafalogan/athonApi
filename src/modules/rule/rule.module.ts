import { RuleController } from 'src/modules/rule/rule.controller';
import { RuleRouter } from 'src/modules/rule/rule.router';
import { AuthService, RuleService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { Application } from 'express';

export default class RuleModule {
	private readonly ruleController: RuleController;
	private ruleRouter: RuleRouter;

	constructor(ruleService: RuleService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.ruleController = new RuleController(ruleService, responseController);
		this.ruleRouter = this._instanceRouleRouter(app, auth);
	}

	init() {
		return this.ruleRouter.exec();
	}

	private _instanceRouleRouter(app: Application, auth: AuthService) {
		return new RuleRouter(this.ruleController, app, auth);
	}
}
