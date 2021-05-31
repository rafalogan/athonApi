import { ProfileServiceOptions, ProfileRuleService, RuleService } from 'src/services';
import { AbstractRelationalService } from 'src/core/services';
import { RelationalReadOptions } from 'src/core/types';

const fields = ['id', 'title', 'description', 'created_at as createdAt', 'updated_at as updatedAt'];

export class ProfileService extends AbstractRelationalService {
	private profileRulesService: ProfileRuleService;
	private ruleService: RuleService;

	constructor(options: ProfileServiceOptions) {
		super({ ...options, serviceName: ProfileService.name, table: 'profiles', fields });
		this.profileRulesService = options.profileRuleService;
		this.ruleService = options.ruleService;
	}

	async read(options?: RelationalReadOptions): Promise<any> {
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
