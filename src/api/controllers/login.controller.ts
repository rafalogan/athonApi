import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { User } from 'src/repositories/entities';
import { LoginService } from 'src/services';
import { Credential } from 'src/repositories/models/credential.model';
import { ResponseController } from 'src/core/controller';
import { onLog } from 'src/util';

export class LoginController {
	constructor(private loginService: LoginService) {}

	async signing(req: Request, res: Response) {
		const auth = new Credential(req.body);
		onLog('Auth', auth);

		this.loginService
			.verifyCredentials(auth)
			.then(data => ResponseController.onSuccess(res, data))
			.catch((err: Error) =>
				ResponseController.onError(res, 'Login Unauthorized! Verify your e-mail and password!', { err, status: httpStatus.UNAUTHORIZED })
			);
	}

	async signup(req: Request, res: Response) {
		const user = new User(req.body);

		this.loginService
			.signupOnApp(user)
			.then(result => ResponseController.onSuccess(res, result, { status: result.status }))
			.catch(err => ResponseController.onError(res, err.message, { err, status: httpStatus.UNAUTHORIZED }));
	}

	validateToken(req: Request, res: Response) {
		this.loginService
			.tokenIsValid(req)
			.then(result => ResponseController.onSuccess(res, result, { status: result.status }))
			.catch(err => ResponseController.onError(res, err.message, { err, status: httpStatus.UNAUTHORIZED }));
	}
}
