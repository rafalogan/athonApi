import { ServicesModule } from 'src/services';
import { LoginController } from 'src/api/controllers/login.controller';
import { UserController } from 'src/api/controllers/user.controller';
import { RuleController } from 'src/api/controllers/rule.controller';

export class ControllersModule {
	loginController: LoginController;
	userController: UserController;
	ruleController: RuleController;

	constructor(private servers: ServicesModule) {
		this.loginController = new LoginController(this.servers.loginService);
		this.userController = new UserController(this.servers.userService);
		this.ruleController = new RuleController(this.servers.ruleService);
	}
}
