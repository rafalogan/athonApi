import { Request } from 'express';
import passport from 'passport';
import jwt from 'jwt-simple';
import httpStatus from 'http-status';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { LogController } from 'src/core/controller';
import { AuthServiceOptions, UserService } from 'src/services/';
import { User } from 'src/entities';
import { Credential, Payload } from 'src/core/domains';
import { existsOrError, isMatch } from 'src/util';

export class AuthService {
	private params: StrategyOptions;
	private userService: UserService;
	private log: LogController;
	private authSecret: string;

	constructor(options: AuthServiceOptions) {
		this.params = this._setStategyOtions();
		this.userService = options.userService;
		this.log = options.log;
		this.authSecret = options.security.authSecret;
	}

	init() {
		const strategy = new Strategy(this.params, (payload, done) => this._setStrategyResponse(payload, done));
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
	}

	async verifyCredentials(credentials: Credential) {
		try {
			const user: User = new User(await this.userService.findByEmail(credentials.email));
			existsOrError(user, 'User not found');

			if (isMatch(credentials, user)) {
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

	private async _setStrategyResponse(payload: Payload, done: (arg0: any, arg1: any) => any) {
		try {
			const { id } = payload;
			const user: User = new User(await this.userService.read({ id }));

			Reflect.deleteProperty(user, 'password');
			return done(null, user ?? false);
		} catch (err) {
			return done(err, false);
		}
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
