import { Application } from 'express';
import { AuthControllerOptions } from 'src/modules/auth/types/auth';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthRouter } from 'src/modules/auth/auth.router';

export default class AuthModule {
	constructor(private controllerOptions: AuthControllerOptions, private app: Application) {}

	init() {
		const authController = new AuthController(this.controllerOptions);
		return new AuthRouter(this.app, authController);
	}
}
