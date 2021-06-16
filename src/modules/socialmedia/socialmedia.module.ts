import { Application } from 'express';

import { AuthService, SocialMediaService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { SocialmediaController } from 'src/modules/socialmedia/socialmedia.controller';
import { SocialmediaRouter } from 'src/modules/socialmedia/socialmedia.router';

export default class SocialmediaModule {
	private socialmediaController: SocialmediaController;
	private socialmediaRouter: SocialmediaRouter;

	constructor(socialMediaService: SocialMediaService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.socialmediaController = new SocialmediaController(socialMediaService, responseController);
		this.socialmediaRouter = new SocialmediaRouter(this.socialmediaController, app, auth);
	}

	init() {
		return this.socialmediaRouter.exec();
	}
}
