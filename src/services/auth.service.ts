import passport from 'passport';
import jwt from 'jwt-simple';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { IUser, Payload, User } from 'src/core/entities/';
import { IAuthServiceOptions, ProfileService, UserService } from 'src/services';
import { Credential } from 'src/modules/auth/credential.entity';
import { AuthException, existsOrError, isMatch } from 'src/util';
import { LogHandler } from 'src/core/handlers';
import httpStatus from 'http-status';

export class AuthService {
	private params: StrategyOptions;
	private userService: UserService;
	private profileService: ProfileService;
	private log: LogHandler;
	private authSecret: string;

	constructor(options: IAuthServiceOptions) {
		this.params = this._setStategyOtions(options.security.authSecret);
		this.userService = options.userService;
		this.profileService = options.profileService;
		this.log = options.loghandler;
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

	async vrifyCredentials(credentials: Credential) {
		try {
			const msg = 'Login Unauthorized! Verify your e-mail and password!';
			const user: User = new User(await this.userService.findByEmail(credentials.email));
			existsOrError(user, msg);

			if (isMatch(credentials, user)) {
				const payload = new Payload(user);
				return { ...payload, token: jwt.encode(payload, this.authSecret) };
			}

			throw new AuthException(msg);
		} catch (err) {
			this.log.error('erro on verify credentials', err);
			return err;
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

	private _setStategyOtions(authSecret: string): StrategyOptions {
		const secretOrKey = authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}
}
