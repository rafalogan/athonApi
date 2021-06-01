import { Application } from 'express';

import { ProfileController } from 'src/modules/profile/profile.controller';
import { ProfileRouter } from 'src/modules/profile/profile.router';
import { AuthService, ProfileService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class ProfileModule {
	private profileController: ProfileController;
	private profileRouter: ProfileRouter;

	constructor(profileService: ProfileService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.profileController = new ProfileController(profileService, responseController);
		this.profileRouter = new ProfileRouter(this.profileController, app, auth);
	}

	init() {
		return this.profileRouter.exec();
	}
}
