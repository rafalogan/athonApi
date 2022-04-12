import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { ProfileRuleController } from 'src/api/profile-rule/profile-rule.controller';
import { AuthService } from 'src/services';

export class ProfileRuleRouter extends AbstractRoutes {
	constructor(private profileRuleController: ProfileRuleController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/profile-rules')
			.all(this.auth?.init().authenticate())
			.get(this.profileRuleController.list.bind(this.profileRuleController))
			.post(this.profileRuleController.save.bind(this.profileRuleController));

		this.app
			.route('/profile-rules/:id')
			.all(this.auth?.init().authenticate())
			.get(this.profileRuleController.list.bind(this.profileRuleController))
			.put(this.profileRuleController.edit.bind(this.profileRuleController))
			.delete(this.profileRuleController.remove.bind(this.profileRuleController));
	}
}
