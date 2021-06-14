import { Application } from 'express';

import { MediaController } from 'src/modules/media/media.controller';
import { MediaRouter } from 'src/modules/media/media.router';
import { AuthService, MediaService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class MediaModule {
	private mediaController: MediaController;
	private mediaRouter: MediaRouter;

	constructor(mediaService: MediaService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.mediaController = new MediaController(mediaService, responseController);
		this.mediaRouter = new MediaRouter(this.mediaController, app, auth);
	}

	init() {
		return this.mediaRouter.exec();
	}
}
