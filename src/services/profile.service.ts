import { AbstractRelationalService, ICServiceOptions, IRPginationOptions } from 'src/core/services';
import { IEnvServiceOptions, IProfileServiceOptions, ProfileRuleService, RuleService } from 'src/services';

export class ProfileService extends AbstractRelationalService {
	private profileRulesService: ProfileRuleService;
	private ruleService: RuleService;
	constructor(profileServiceOptions: IProfileServiceOptions, cacheOptions: ICServiceOptions, env: IEnvServiceOptions) {
		super(profileServiceOptions, cacheOptions, env);
		this.profileRulesService = profileServiceOptions.profileRulesService;
		this.ruleService = profileServiceOptions.ruleService;
	}

	async read(options?: IRPginationOptions): Promise<any> {
		return super.read(options).then(result => {
			if (result.data) {
				result.data = result.data.map(this._setProfilePermissions);
				return result;
			}
			return this._setProfilePermissions(result);
		});
	}

	private async _setProfilePermissions(profile: any) {
		const { id } = profile;

		profile.permissions = await this._findRulesByProfile(id);
		return profile;
	}

	private async _findRulesByProfile(profileId: number) {
		const rulesId = await this.profileRulesService.findRulesByProfileId(profileId);

		return Array.isArray(rulesId)
			? rulesId.map(async (rule: { ruleId: number }) => {
					const { ruleId: id } = rule;
					return await this.ruleService.read({ id });
			  })
			: [];
	}
}
