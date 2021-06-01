import { AuthService, ProfileRuleService, ProfileService, RuleService, UserRuleService, UserService } from 'src/services';
import { CacheConnectionController, LogController, RelationalConnectionController } from 'src/core/controller';
import { ProfileEnv } from 'src/environment';
import { CacheServiceOptions, RelationalServiceOptions } from 'src/core/types';

export default class ServicesModule {
	profileRuleService: ProfileRuleService;
	profileService: ProfileService;
	userService: UserService;
	userRuleService: UserRuleService;
	ruleService: RuleService;
	authService: AuthService;

	constructor(
		private relationalConnectionController: RelationalConnectionController,
		private cacheConnectionController: CacheConnectionController,
		private logController: LogController,
		private profileEnv: ProfileEnv
	) {
		this.ruleService = new RuleService(this._setRelationalServiceOptions());
		this.profileRuleService = new ProfileRuleService(this._setRelationalServiceOptions());
		this.userRuleService = new UserRuleService(this._setRelationalServiceOptions());
		this.profileService = this._instanceProfileService();
		this.userService = this._instanceUserService();
		this.authService = this._istanceAutService();
	}

	private _istanceAutService() {
		const { security } = this.profileEnv;
		console.log('security', security);
		return new AuthService({ userService: this.userService, log: this.logController, security });
	}

	private _instanceUserService() {
		const relationaOptions = this._setRelationalServiceOptions();
		const {
			security: { saltRounds: salt },
		} = this.profileEnv;

		return new UserService({
			profileService: this.profileService,
			...relationaOptions,
			userRuleService: this.userRuleService,
			ruleService: this.ruleService,
			salt,
		});
	}

	private _instanceProfileService() {
		const relatinalOptions = this._setRelationalServiceOptions();

		return new ProfileService({ ...relatinalOptions, profileRuleService: this.profileRuleService, ruleService: this.ruleService });
	}

	private _setCacheServiceOptions(): CacheServiceOptions {
		const client = this.cacheConnectionController.connection;
		const status = this.cacheConnectionController.connectonUp;
		const log = this.logController;
		const { env } = this.profileEnv;

		return { client, status, log, env };
	}

	private _setRelationalServiceOptions(): RelationalServiceOptions {
		const cacheOptions = this._setCacheServiceOptions();
		const instance = this.relationalConnectionController.connection;
		const table = '';
		const fields: any = [];
		const serviceName = '';
		const {
			cache: { enableCache, cacheTime },
		} = this.profileEnv;

		return {
			instance,
			table,
			fields,
			serviceName,
			enableCache,
			cacheTime,
			...cacheOptions,
		};
	}
}
