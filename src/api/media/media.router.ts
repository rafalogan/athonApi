import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { AuthService } from 'src/services';
import { MediaController } from 'src/api/media/media.controller';

export class MediaRouter extends AbstractRoutes {
	constructor(private mediaController: MediaController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec(): void {
		this.app
			.route('/medias')
			.all(this.auth?.init().authenticate())
			.get(this.mediaController.list.bind(this.mediaController))
			.post(this.mediaController.save.bind(this.mediaController));

		this.app
			.route('/medias/:id')
			.all(this.auth?.init().authenticate())
			.get(this.mediaController.list.bind(this.mediaController))
			.put(this.mediaController.edit.bind(this.mediaController))
			.delete(this.mediaController.remove.bind(this.mediaController));
	}
}
