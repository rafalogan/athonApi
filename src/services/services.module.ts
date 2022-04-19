import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { Environment } from 'src/config/environment.config';
import { UserService } from 'src/services/user.service';
import { LoginService } from 'src/services/login.service';
import { ProfileService } from 'src/services/profile.service';
import { UserRuleService } from 'src/services/user-rule.service';
import { RuleService } from 'src/services/rule.service';
import { ProfileRuleService } from 'src/services/profile-rule.service';
import { RelationalServiceOptions } from 'src/core/types';
import { ContactService } from 'src/services/contact.service';
import { AnswerService } from 'src/services/answer.service';

export class ServicesModule {
	ruleService: RuleService;
	profileRuleService: ProfileRuleService;
	profileService: ProfileService;
	userRuleService: UserRuleService;
	userService: UserService;
	loginService: LoginService;
	contactService: ContactService;
	answerService: AnswerService;

	constructor(private databaseConn: ConnectionController, private cacheConn: CacheConnectionController, private env: Environment) {
		const conn = this.databaseConn.connection;
		const cache = this.cacheConn.connection;
		const options = this.setOptions();

		this.ruleService = new RuleService(conn, cache, options);
		this.profileRuleService = new ProfileRuleService(conn, cache, options);
		this.profileService = new ProfileService(this.profileRuleService, this.ruleService, conn, cache, options);
		this.userRuleService = new UserRuleService(conn, cache, options);
		this.userService = new UserService(this.profileService, this.userRuleService, this.ruleService, this.env.salt, conn, cache, options);
		this.loginService = new LoginService(this.userService, this.env.security.authSecret);
		this.contactService = new ContactService(conn, cache, options);
		this.answerService = new AnswerService(this.contactService, conn, cache, options);
	}

	private setOptions(): RelationalServiceOptions {
		return {
			cacheTime: this.env.cacheEnv.cacheTime,
			active: this.env.cacheEnv.enableCache,
			nodeEnv: this.env.nodeEnv,
		};
	}
}
