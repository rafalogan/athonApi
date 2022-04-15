import { Application } from 'express';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';
import { IAuthConfig } from 'src/repositories/types';
import { ControllersModule } from 'src/api/controllers';
import { RoutesModule } from 'src/api/routes';

export class ApiModule {
	controllers: ControllersModule;
	routes: RoutesModule;
	constructor(private app: Application, private auth: IAuthConfig, private services: ServicesModule) {
		this.controllers = new ControllersModule(this.services);
		this.routes = new RoutesModule(this.controllers, this.app, this.auth);
	}

	exec() {
		this.routes.exec();
		this.app.use(notfoundRoute);
	}
}
