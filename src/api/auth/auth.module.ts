import { Application } from 'express';
import { AuthControllerOptions } from 'src/api/auth/types/auth';
import { AuthController } from 'src/api/auth/auth.controller';
import { AuthRouter } from 'src/api/auth/auth.router';

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
