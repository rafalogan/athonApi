import express, { Application } from 'express';
import { resolve } from 'path';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';
import { IAuthConfig } from 'src/repositories/types';
import { ControllersModule } from 'src/api/controllers';
import { RoutesModule } from 'src/api/routes';
import { MulterConfig } from 'src/config/multer.config';

export class ApiModule {
	controllers: ControllersModule;
	routes: RoutesModule;
	constructor(private app: Application, private auth: IAuthConfig, private services: ServicesModule, private multer: MulterConfig) {
		this.controllers = new ControllersModule(this.services);
		this.routes = new RoutesModule(this.controllers, this.app, this.auth, this.multer);
	}

	exec() {
		this.routes.exec();
		this.app.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')));
		this.app.use(notfoundRoute);
	}
}
