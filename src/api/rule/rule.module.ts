import { RuleController } from 'src/api/rule/rule.controller';
import { RuleRouter } from 'src/api/rule/rule.router';
import { LoginService, RuleService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { Application } from 'express';

export default class RuleModule {
	private readonly ruleController: RuleController;
	private ruleRouter: RuleRouter;

	constructor(ruleService: RuleService, responseController: ResponseController, app: Application, auth: LoginService) {
		this.ruleController = new RuleController(ruleService, responseController);
		this.ruleRouter = this._instanceRouleRouter(app, auth);
	}

	init() {
		return this.ruleRouter.exec();
	}

	private _instanceRouleRouter(app: Application, auth: LoginService) {
		return new RuleRouter(this.ruleController, app, auth);
	}
}
