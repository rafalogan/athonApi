import { ProfileServiceOptions, ProfileRuleService, RuleService } from 'src/services';
import { AbstractDatabaseService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import { ProfileEntity } from 'src/repositories/types';

const fields = ['id', 'title', 'description', 'created_at as createdAt', 'updated_at as updatedAt'];

export class ProfileService extends AbstractDatabaseService {
	constructor(
		private profileRulesService: ProfileRuleService,
		private ruleService: RuleService,
		conn: Knex,
		cache: RedisClientType,
		options?: RelationalServiceOptions
	) {
		super(conn, cache, 'profiles', { ...options, fields });
	}

	async read(options?: RelationalReadOptions): Promise<any> {
		return super.read(options).then(result => {
			if (result.data) {
				result.data = result.data.map(this.setProfilePermissions);
				return result;
			}
			return this._setProfilePermissions(result);
		});
	}

	private async setProfilePermissions(profile: ProfileEntity) {
		const id = Number(profile.id);

		profile.permissions = await this.findRulesByProfile(id);
		return profile;
	}

	private async findRulesByProfile(profileId: number) {
		const rulesId = await this.profileRulesService.findRulesByProfileId(profileId);

		return Array.isArray(rulesId)
			? rulesId.map(async rule => {
					const { ruleId: id } = rule;
					return await this.ruleService.read({ id });
			  })
			: [];
	}
}
