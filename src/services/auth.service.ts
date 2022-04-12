import { Request } from 'express';
import passport from 'passport';
import jwt from 'jwt-simple';
import httpStatus from 'http-status';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { LogController } from 'src/core/controller';
import { AuthServiceOptions, UserService } from 'src/services/';
import { User } from 'src/repositories/entities';
import { Credential, Payload } from 'src/core/domains';
import { existsOrError, isMatch } from 'src/util';

export class AuthService {
	private readonly params: StrategyOptions;
	private userService: UserService;
	private log: LogController;
	private readonly authSecret: string;

	constructor(options: AuthServiceOptions) {
		this.userService = options.userService;
		this.log = options.log;
		this.authSecret = options.security.authSecret;
		this.params = this._setStategyOtions();
	}

	init() {
		const strategy = new Strategy(this.params, (payload, done) => {
			const id = Number(payload?.id);

			this.userService
				.read({ id })
				.then(data => done(null, data instanceof User ? this._prepareUserToToken(data) : false))
				.catch(err => done(err, false));
		});
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
	}

	async verifyCredentials(credentials: Credential) {
		try {
			const findDB = await this.userService.findByEmail(credentials.email);
			const user = new User(findDB);
			existsOrError(user, 'User not found');

			if (isMatch(credentials, user) && user) {
				const payload = new Payload(user);
				return { ...payload, token: jwt.encode(payload, this.authSecret) };
			}
		} catch (err) {
			this.log.error('erro on verify credentials', err);
			return err;
		}
	}

	async signupOpApp(user: User) {
		return this.userService.create(user);
	}

	getPayload(req: Request) {
		const token = this._extractToken(req);
		return token ? this._decodeToken(token) : undefined;
	}

	tokemIsValid(req: Request) {
		try {
			const token = this._extractToken(req);
			const payload = token ? this._decodeToken(token) : undefined;
			const valid = payload?.exp ? new Date(payload.exp * 1000) > new Date() : false;
			const code = valid ? 200 : httpStatus.UNAUTHORIZED;

			existsOrError(token, 'Token is not valid or not found.');
			existsOrError(payload, 'Payload is not found.');

			return valid ? { valid, code, message: 'Token is valid' } : { valid, code, message: 'token is not valid' };
		} catch (message) {
			this.log.error(message);
			return { valid: false, code: httpStatus.UNAUTHORIZED, message };
		}
	}

	private _prepareUserToToken(user: User) {
		Reflect.deleteProperty(user, 'password');
		return user;
	}

	private _setStategyOtions(): StrategyOptions {
		const secretOrKey = this.authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}

	private _extractToken(req: Request) {
		const { authorization } = req.headers;
		const [agent, token] = authorization ? authorization.split(' ') : [];

		return agent === 'Bearer' ? token : undefined;
	}

	private _decodeToken(token: string): Payload {
		const dataRaw = jwt.decode(token, this.authSecret);

		return new Payload(dataRaw);
	}
}
