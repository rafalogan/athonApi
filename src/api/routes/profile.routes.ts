import { AbstractRoutes } from 'src/core/routes';
import { ProfileController } from 'src/api/controllers/profile.controller';
import { Application } from 'express';
import { IAuthConfig } from 'src/repositories/types';
import { ProfileRuleController } from 'src/api/controllers';

export class ProfileRoutes extends AbstractRoutes {
	constructor(
		private profileController: ProfileController,
		private profileRuleController: ProfileRuleController,
		app: Application,
		auth: IAuthConfig
	) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/profiles')
			.all(this.auth?.authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.post(this.profileController.save.bind(this.profileController));

		this.app
			.route('/profiles/rules')
			.all(this.auth?.authenticate())
			.get(this.profileRuleController.list.bind(this.profileRuleController))
			.post(this.profileRuleController.save.bind(this.profileRuleController));

		this.app
			.route('/profiles/rules/:id')
			.all(this.auth?.authenticate())
			.get(this.profileRuleController.list.bind(this.profileRuleController))
			.delete(this.profileRuleController.remove.bind(this.profileRuleController));

		this.app
			.route('/profiles/:id')
			.all(this.auth?.authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.put(this.profileController.edit.bind(this.profileController))
			.delete(this.profileController.remove.bind(this.profileController));
	}
}
