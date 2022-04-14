import { Application } from 'express';
import { AbstractRoutes } from 'src/core/routes/abstract.routes';
import { LoginController } from 'src/api/login/login.controller';
import { methodNotAllowed } from 'src/core/routes';

export class LoginRoutes extends AbstractRoutes {
	constructor(private authController: LoginController, app: Application) {
		super(app);
	}

	exec() {
		this.app.route('/signing').post(this.authController.signing.bind(this.authController)).all(methodNotAllowed);
		this.app.route('/signup').post(this.authController.signup.bind(this.authController)).all(methodNotAllowed);
		this.app.route('validate-token').post(this.authController.validateToken.bind(this.authController)).all(methodNotAllowed);
	}
}
