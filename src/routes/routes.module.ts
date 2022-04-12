import { Application } from 'express';

import { ControllersModule } from 'src/controllers/controllers.module';
import { notfoundRoute } from 'src/core/routes';

export class RoutesModule {
	constructor(private app: Application, private controllersModule: ControllersModule) {}

	exec() {
		this.app.use(notfoundRoute);
	}
}
