import { Request, Response } from 'express';

import { IAuthControllerOptions, ICredentials } from 'src/modules/auth/types/auth';
import { AuthService, UserService } from 'src/services';
import { LogHandler, ResponseHandler } from 'src/core/handlers';
import { Credential } from 'src/modules/auth/credential.entity';
import httpStatus from 'http-status';

export class AuthController {
	private authService: AuthService;
	private responseHandler: ResponseHandler;
	private log: LogHandler;

	constructor(options: IAuthControllerOptions) {
		this.authService = options.authService;
		this.responseHandler = options.responseHandler;
		this.log = options.logHandler;
	}

	async authentication(req: Request, res: Response) {
		const auth: Credential = new Credential(req.body);

		this.authService
			.vrifyCredentials(auth)
			.then(data => this.responseHandler.onSuccess(res, data))
			.catch(err =>
				this.responseHandler.onError(res, 'Login Unauthorized! Verify your e-mail and password!', err, httpStatus.UNAUTHORIZED)
			);
	}
}
