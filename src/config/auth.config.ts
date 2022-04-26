import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { UserService } from 'src/services';
import { PayloadDomain, IAuthConfig } from 'src/repositories/types';
import { User } from 'src/repositories/entities';
import { deleteField } from 'src/util';

export class AuthConfig {
	auth: IAuthConfig;

	private readonly params: StrategyOptions;

	constructor(private authSecret: string, private userService: UserService) {
		this.params = this.setStrategyOptions();
		this.auth = this.exec();
	}

	exec(): IAuthConfig {
		const strategy = new Strategy(this.params, this.verify.bind(this));
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
	}

	verify(payload: PayloadDomain, done: VerifiedCallback) {
		const id = Number(payload.id);
		this.userService
			.read({ id })
			.then(data => done(null, data instanceof User ? deleteField(data, 'password') : false))
			.catch(error => done(error, false));
	}

	private setStrategyOptions(): StrategyOptions {
		const secretOrKey = this.authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}
}
