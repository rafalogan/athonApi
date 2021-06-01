import { AbstractRoutes } from 'src/core/routes';
import { ProfileController } from 'src/modules/profile/profile.controller';
import { Application } from 'express';
import { AuthService } from 'src/services';

export class ProfileRouter extends AbstractRoutes {
	constructor(private profileController: ProfileController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/profiles')
			.all(this.auth?.init().authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.post(this.profileController.save.bind(this.profileController));

		this.app
			.route('/profiles/:id')
			.all(this.auth?.init().authenticate())
			.get(this.profileController.list.bind(this.profileController))
			.put(this.profileController.edit.bind(this.profileController))
			.delete(this.profileController.remove.bind(this.profileController));
	}
}
