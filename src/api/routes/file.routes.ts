import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { FileController } from 'src/api/controllers/file.controller';
import { IAuthConfig } from 'src/repositories/types';
import { upload } from 'src/util';

export class FileRoutes extends AbstractRoutes {
	constructor(private fileController: FileController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec(): void {
		this.app
			.route('/files')
			.all(this.auth?.authenticate())
			.get(this.fileController.list.bind(this.fileController))
			.post(upload.single('file'), this.fileController.save.bind(this.fileController));

		this.app
			.route('/files/:id')
			.all(this.auth?.authenticate())
			.get(this.fileController.list.bind(this.fileController))
			.delete(this.fileController.remove.bind(this.fileController));
	}
}
