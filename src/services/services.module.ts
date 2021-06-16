import { Model } from 'mongoose';

import {
	AnswerService,
	AuthService,
	CategoryService,
	ContactService,
	MediaService,
	NewsletterService,
	ProfileRuleService,
	ProfileService,
	RuleService,
	SocialMediaService,
	UserRuleService,
	UserService,
} from 'src/services';
import { CacheConnectionController, LogController, RelationalConnectionController } from 'src/core/controller';
import { ProfileEnv } from 'src/environment';
import { CacheServiceOptions, RelationalServiceOptions } from 'src/core/types';
import { CategoriesModel, MediasModel, SocialMediaModel } from 'src/schemas';

export default class ServicesModule {
	profileRuleService: ProfileRuleService;
	profileService: ProfileService;
	userService: UserService;
	userRuleService: UserRuleService;
	ruleService: RuleService;
	authService: AuthService;
	contactService: ContactService;
	answerService: AnswerService;
	newsletterService: NewsletterService;
	categoryService: CategoryService;
	mediaService: MediaService;
	socialMediaService: SocialMediaService;

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
		this.authService = this._instanceAuthService();
		this.contactService = new ContactService(this._setRelationalServiceOptions());
		this.answerService = this._instanceAnswerService();
		this.newsletterService = new NewsletterService(this._setRelationalServiceOptions());
		this.categoryService = this._instanceCategoryService();
		this.mediaService = this._instanceMediaService();
		this.socialMediaService = this._istanceSocialMediaService();
	}

	private _instanceAnswerService() {
		return new AnswerService(this.contactService, this._setRelationalServiceOptions());
	}

	private _instanceAuthService() {
		const { security } = this.profileEnv;
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

	private _instanceCategoryService() {
		const options = this._setCacheServiceOptions();

		return new CategoryService(this.authService, {
			...options,
			...this._setCacheEnvOptions(),
			schema: 'Categories',
			instanceModel: CategoriesModel,
			serviceName: '',
		});
	}

	private _instanceMediaService() {
		const options = this._setCacheServiceOptions();

		return new MediaService(this.authService, {
			...options,
			...this._setCacheEnvOptions(),
			schema: 'Medias',
			instanceModel: MediasModel,
			serviceName: '',
		});
	}

	private _istanceSocialMediaService() {
		return new SocialMediaService(this.authService, {
			...this._setCacheServiceOptions(),
			...this._setCacheEnvOptions(),
			serviceName: '',
			instanceModel: SocialMediaModel,
			schema: 'Socialmedias',
		});
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

	private _setCacheEnvOptions() {
		const {
			cache: { enableCache, cacheTime },
		} = this.profileEnv;

		return { enableCache, cacheTime };
	}
}
