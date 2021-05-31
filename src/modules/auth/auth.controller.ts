import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { LogController, ResponseController } from 'src/core/controller';
import { User } from 'src/entities';
import { AuthService } from 'src/services';
import { AuthControllerOptions } from 'src/modules/auth/types/auth';
import { Credential } from 'src/core/domains/credential.domain';

export class AuthController {
	private authService: AuthService;
	private response: ResponseController;
	private log: LogController;

	constructor(options: AuthControllerOptions) {
		this.authService = options.authService;
		this.response = options.responseController;
		this.log = options.logController;
	}

	async signin(req: Request, res: Response) {
		const auth = new Credential(req.body);

		this.authService
			.verifyCredentials(auth)
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'Login Unauthorized! Verify your e-mail and password!', err, httpStatus.UNAUTHORIZED));
	}

	async signup(req: Request, res: Response) {
		const user = new User(req.body);

		this.authService
			.signupOpApp(user)
			.then(result => {
				if (result.code && result.code === httpStatus.BAD_REQUEST) return this.response.onError(res, result.msg, undefined, result.code);

				Reflect.deleteProperty(user, 'password');
				Reflect.deleteProperty(user, 'confirmPassword');

				this.log.info('result save', result);
				return this.response.onSuccess(res, user);
			})
			.catch(err => this.response.onError(res, 'Unexpected error', err));
	}

	validateToken(req: Request, res: Response) {
		const result = this.authService.tokemIsValid(req);
		const { code, message } = result;

		code === 200 ? this.response.onSuccess(res, result) : this.response.onError(res, message, undefined, code);
	}
}
