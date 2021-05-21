import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { IAuthServiceOptions } from 'src/services/types';
import { ProfileService } from './profile.service';
import { UserService } from './user.service';
import { IPayload } from 'src/core/entities/types/payload';
import { IUser } from 'src/core/entities/types/user';
import { IProfile } from 'src/core/entities/types/profile';

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

	private async _setStrategyResponse(
		payload: IPayload,
		done: (arg0: null, arg1: boolean | { id: number; name: string; email: string; profile: IProfile }) => any
	) {
		try {
			const id = payload.id;
			const user: IUser = await this.userService.read({ id });
			const profile: IProfile = user.profileId ? await this.profileService.read({ id: user.profileId }) : {};

			const result = user
				? {
						id: user.id,
						name: user.name,
						email: user.email,
						profile,
				  }
				: false;

			return done(null, result);
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
