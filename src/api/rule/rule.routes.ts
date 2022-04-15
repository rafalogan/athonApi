import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { RuleController } from 'src/api/rule/rule.controller';
import { IAuthConfig } from 'src/repositories/types';

export class RuleRoutes extends AbstractRoutes {
	constructor(private ruleController: RuleController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/rules')
			.all(this.auth?.authenticate())
			.get(this.ruleController.list.bind(this.ruleController))
			.post(this.ruleController.save.bind(this.ruleController));

		this.app
			.route('/rules/:id')
			.all(this.auth?.authenticate())
			.get(this.ruleController.list.bind(this.ruleController))
			.put(this.ruleController.edit.bind(this.ruleController))
			.delete(this.ruleController.remove.bind(this.ruleController));
	}
}
