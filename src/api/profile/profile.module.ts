import { Application } from 'express';

import { ProfileController } from 'src/api/profile/profile.controller';
import { ProfileRouter } from 'src/api/profile/profile.router';
import { LoginService, ProfileService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class ProfileModule {
	private profileController: ProfileController;
	private profileRouter: ProfileRouter;

	constructor(profileService: ProfileService, responseController: ResponseController, app: Application, auth: LoginService) {
		this.profileController = new ProfileController(profileService, responseController);
		this.profileRouter = new ProfileRouter(this.profileController, app, auth);
	}

	init() {
		return this.profileRouter.exec();
	}
}
