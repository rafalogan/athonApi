import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { LoginService } from 'src/services';
import { FileController } from 'src/api/controllers/file.controller';

export class MediaRouter extends AbstractRoutes {
	constructor(private mediaController: FileController, app: Application, auth: LoginService) {
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
