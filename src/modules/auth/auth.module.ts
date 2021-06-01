import { Application } from 'express';
import { AuthControllerOptions } from 'src/modules/auth/types/auth';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthRouter } from 'src/modules/auth/auth.router';

export default class AuthModule {
	private authController: AuthController;
	private authRouter: AuthRouter;

	constructor(private controllerOptions: AuthControllerOptions, private app: Application) {
		this.authController = new AuthController(this.controllerOptions);
		this.authRouter = new AuthRouter(this.app, this.authController);
	}

	init() {
		return this.authRouter.exec();
	}
}
