import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { ProfileEnv } from 'src/environment';
import AuthModule from 'src/modules/auth/auth.module';
import CoreModule from 'src/core/core.module';
import ServicesModule from 'src/services/services.module';
import UserModule from 'src/modules/user/user.module';
import RuleModule from 'src/modules/rule/rule.module';
import ProfileModule from 'src/modules/profile/profile.module';
import ProfileRuleModule from 'src/modules/profile-rule/profile-rule.module';
import UserRuleModule from 'src/modules/user-rule/user-rule.module';
import ContactModule from 'src/modules/contact/contact.module';

export class AppController {
	private _express: Application;

	constructor(private coreModule: CoreModule, private profileEnv: ProfileEnv, private servicesModule: ServicesModule) {
		this._express = express();

		this.exec();
	}

	get express() {
		return this._express;
	}

	private exec() {
		this._configExpress();
		this._initModules();
	}

	private _configExpress() {
		this.express.use(cors());
		this.express.use(this._morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private _morganConfig() {
		const {
			loggerController: { logger },
		} = this.coreModule;
		const { env } = this.profileEnv;

		const format = env === 'development' || env === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private _initModules() {
		const { responseController, logController } = this.coreModule;
		const { authService, userService, ruleService, profileRuleService, profileService, userRuleService, contactService } =
			this.servicesModule;

		const authModule = new AuthModule({ authService, responseController, logController }, this.express);
		const userModule = new UserModule(userService, responseController, this.express, authService);
		const ruleModule = new RuleModule(ruleService, responseController, this.express, authService);
		const porfileModule = new ProfileModule(profileService, responseController, this.express, authService);
		const profileRuleModule = new ProfileRuleModule(profileRuleService, responseController, this.express, authService);
		const userRuleModule = new UserRuleModule(userRuleService, responseController, this.express, authService);
		const contactModule = new ContactModule(contactService, responseController, this.express, authService);

		authModule.init();
		userModule.init();
		ruleModule.init();
		porfileModule.init();
		profileRuleModule.init();
		userRuleModule.init();
		contactModule.init();
	}
}
