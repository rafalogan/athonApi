import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { RuleController } from 'src/api/rule/rule.controller';
import { LoginService } from 'src/services';

export class RuleRouter extends AbstractRoutes {
	constructor(private ruleController: RuleController, app: Application, auth: LoginService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/rules')
			.all(this.auth?.init().authenticate())
			.get(this.ruleController.list.bind(this.ruleController))
			.post(this.ruleController.save.bind(this.ruleController));

		this.app
			.route('/rules/:id')
			.all(this.auth?.init().authenticate())
			.get(this.ruleController.list.bind(this.ruleController))
			.put(this.ruleController.edit.bind(this.ruleController))
			.delete(this.ruleController.remove.bind(this.ruleController));
	}
}
