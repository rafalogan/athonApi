import { IEnvServiceOptions, IUserServiceOptions, ProfileService, RuleService, UserRuleService } from 'src/services';
import { AbstractRelationalService, ICServiceOptions, IRPginationOptions } from 'src/core/services';

export class UserService extends AbstractRelationalService {
	private profileService: ProfileService;
	private userRuleService: UserRuleService;
	private ruleService: RuleService;

	constructor(userServiceOptions: IUserServiceOptions, cacheOptions: ICServiceOptions, env: IEnvServiceOptions) {
		super(userServiceOptions, cacheOptions, env);
		this.profileService = userServiceOptions.profileService;
		this.userRuleService = userServiceOptions.userRuleService;
		this.ruleService = userServiceOptions.ruleService;
	}

	async read(options?: IRPginationOptions): Promise<any> {
		return super.read(options).then(result => {
			if (result.data) {
				result.data = result.data.map(this._setUserRules);
				return result;
			}

			return this._setUserRules(result);
		});
	}

	findByEmail(email: string) {
		return this.instance(this.table)
			.select()
			.where({ email })
			.then(user => this._setUserRules(user))
			.catch(err => this.log.error(`Find user by email: ${email} failed`, err));
	}

	private async _setUserRules(user: any) {
		const { id } = user;

		user.profile = await this.profileService.read({ id });
		user.rules = await this._findRulesByUser(id);
		return user;
	}
	private async _findRulesByUser(userId: number) {
		const rulesIds = await this.userRuleService.findRulesByUserId(userId);

		return Array.isArray(rulesIds)
			? rulesIds.map(async (item: { ruleId: number }) => {
					const { ruleId: id } = item;
					return await this.ruleService.read({ id });
			  })
			: [];
	}
}
