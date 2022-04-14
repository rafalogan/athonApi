import { Application } from 'express';

import { MediaController } from 'src/api/media/media.controller';
import { MediaRouter } from 'src/api/media/media.router';
import { LoginService, MediaService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class MediaModule {
	private mediaController: MediaController;
	private mediaRouter: MediaRouter;

	constructor(mediaService: MediaService, responseController: ResponseController, app: Application, auth: LoginService) {
		this.mediaController = new MediaController(mediaService, responseController);
		this.mediaRouter = new MediaRouter(this.mediaController, app, auth);
	}

	init() {
		return this.mediaRouter.exec();
	}
}
