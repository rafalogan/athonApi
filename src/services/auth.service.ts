import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { Payload, User } from 'src/core/entities/';
import { IAuthServiceOptions, ProfileService, UserService } from 'src/services';

export class AuthService {
	private params: StrategyOptions;
	private userService: UserService;
	private profileService: ProfileService;

	constructor(options: IAuthServiceOptions) {
		this.params = this._setStategyOtions(options.security.authSecret);
		this.userService = options.userService;
		this.profileService = options.profileService;
	}

	init() {
		const strategy = new Strategy(this.params, (payload, done) => this._setStrategyResponse(payload, done));
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
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
