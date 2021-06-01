import { Application } from 'express';

import { UserController } from 'src/modules/user/user.controller';
import { UserRouter } from 'src/modules/user/user.router';
import { AuthService, UserService } from 'src/services';
import { ResponseController } from 'src/core/controller';

export default class UserModule {
	private readonly userController: UserController;
	private userRouter: UserRouter;

	constructor(userService: UserService, responseController: ResponseController, app: Application, atuh: AuthService) {
		this.userController = new UserController(userService, responseController);
		this.userRouter = this._instanceUserRouter(app, atuh);
	}

	init() {
		return this.userRouter.exec();
	}

	private _instanceUserRouter(app: Application, auth: AuthService) {
		return new UserRouter(this.userController, app, auth);
	}
}
