import { Application } from 'express';
import { AbstractRoutes } from 'src/core/routes/abstract.routes';
import { AuthController } from 'src/modules/auth/auth.controller';

export class AuthRouter extends AbstractRoutes {
	private authController: AuthController;

	constructor(app: Application, controller: AuthController) {
		super(app);
		this.authController = controller;
	}

	exec() {
		this.app.route('/signin').post(this.authController.signin.bind(this.authController));
		this.app.route('/signup').post(this.authController.signup.bind(this.authController));
		this.app.route('validate-token').post(this.authController.validateToken.bind(this.authController));
	}
}
