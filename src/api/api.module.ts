import { Application } from 'express';

import { ServicesModule } from 'src/services';
import { notfoundRoute } from 'src/core/routes';
import { LoginController } from 'src/api/login/login.controller';
import { LoginRoutes } from 'src/api/login/login.routes';
import { IAuthConfig } from 'src/repositories/types';
import { UserController } from 'src/api/user/user.controller';
import { UserRoutes } from 'src/api/user/user.routes';
import { RuleRoutes } from 'src/api/rule/rule.routes';
import { RuleController } from 'src/api/rule/rule.controller';

export class ApiModule {
	loginController: LoginController;
	loginRoutes: LoginRoutes;
	userController: UserController;
	userRoutes: UserRoutes;
	ruleController: RuleController;
	ruleRoutes: RuleRoutes;
	constructor(private app: Application, private auth: IAuthConfig, private services: ServicesModule) {
		this.loginController = new LoginController(this.services.loginService);
		this.loginRoutes = new LoginRoutes(this.loginController, this.app);

		this.userController = new UserController(this.services.userService);
		this.userRoutes = new UserRoutes(this.userController, this.app, this.auth);

		this.ruleController = new RuleController(this.services.ruleService);
		this.ruleRoutes = new RuleRoutes(this.ruleController, this.app, this.auth);
	}

	exec() {
		this.userRoutes.exec();
		this.loginRoutes.exec();
		this.ruleRoutes.exec();
		this.app.use(notfoundRoute);
	}
}
