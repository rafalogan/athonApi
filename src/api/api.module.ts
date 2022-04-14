import { Application } from 'express';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';
import { AuthConfig } from 'src/config/auth.config';
import { LoginController } from 'src/api/login/login.controller';
import { LoginRoutes } from 'src/api/login/login.routes';

export class ApiModule {
	loginController: LoginController;
	loginRoutes: LoginRoutes;
	constructor(private app: Application, private auth: AuthConfig, private services: ServicesModule) {
		this.loginController = new LoginController(this.services.loginService);
		this.loginRoutes = new LoginRoutes(this.loginController, app);
	}

	exec() {
		this.loginRoutes.exec();
		this.app.use(notfoundRoute);
	}
}
