import { Request } from 'express';
import jwt from 'jwt-simple';
import httpStatus from 'http-status';

import { User } from 'src/repositories/entities';
import { Credential, Payload } from 'src/repositories/models';
import { existsOrError, isMatch } from 'src/util';
import { UserService } from 'src/services/user.service';
import { ResponseCreateUser, SignupSuccessResponse, ValidateTokenResponse } from 'src/repositories/types';

export class LoginService {
	constructor(private userService: UserService, private authSecret: string) {}

	async verifyCredentials(credentials: Credential) {
		const findDB = await this.userService.findByEmail(credentials.email);
		const user = new User(findDB);
		existsOrError(user, 'User not found');

		if (isMatch(credentials, user)) {
			const payload = new Payload(user);
			return { ...payload, token: jwt.encode(payload, this.authSecret) };
		}
	}

	async signupOnApp(user: User) {
		try {
			await this.userService.userValidate(user);
		} catch (err) {
			return err;
		}

		return this.userService
			.create(user)
			.then(result => this.setSinguup(result))
			.catch(err => err);
	}

	getPayload(req: Request) {
		const token = this.extractToken(req);
		return token ? this.decodeToken(token) : undefined;
	}

	async tokenIsValid(req: Request): Promise<ValidateTokenResponse> {
		const token = this.extractToken(req);
		const payload = token ? this.decodeToken(token) : undefined;
		const valid = payload?.exp ? new Date(payload.exp * 1000) > new Date() : false;
		const status = valid ? httpStatus.OK : httpStatus.UNAUTHORIZED;

		existsOrError(token, 'Token is not valid or not found.');
		existsOrError(payload, 'Payload is not found.');

		return valid ? { valid, status, message: 'Token is valid', token } : { valid, status, message: 'token expired', token };
	}

	private extractToken(req: Request) {
		const { authorization } = req.headers;
		const [agent, token] = authorization ? authorization.split(' ') : [];

		return agent === 'Bearer' ? token : undefined;
	}

	private decodeToken(token: string): Payload {
		const dataRaw = jwt.decode(token, this.authSecret);

		return new Payload(dataRaw);
	}

	private setSinguup(result: ResponseCreateUser): SignupSuccessResponse {
		return {
			...result,
			status: httpStatus.CREATED,
			message: 'User created successfully',
		};
	}
}
