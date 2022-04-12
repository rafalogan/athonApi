import { Application } from 'express';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';

export class ControllersModule {
	constructor(private app: Application, private services: ServicesModule) {}

	exec() {
		this.app.use(notfoundRoute);
	}
}
