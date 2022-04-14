import { Application } from 'express';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';
import { AuthConfig } from 'src/config/auth.config';

export class ApiModule {
	constructor(private app: Application, private auth: AuthConfig, private services: ServicesModule) {}

	exec() {
		this.app.use(notfoundRoute);
	}
}
