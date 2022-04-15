import { Application } from 'express';
import { AbstractRoutes } from 'src/core/routes/abstract.routes';
import { LoginController } from 'src/api/controllers/login.controller';
import { methodNotAllowed } from 'src/core/routes';

export class LoginRoutes extends AbstractRoutes {
	constructor(private loginController: LoginController, app: Application) {
		super(app);
	}

	exec() {
		this.app.route('/signing').post(this.loginController.signing.bind(this.loginController)).all(methodNotAllowed);
		this.app.route('/signup').post(this.loginController.signup.bind(this.loginController)).all(methodNotAllowed);
		this.app.route('validate-token').post(this.loginController.validateToken.bind(this.loginController)).all(methodNotAllowed);
	}
}
