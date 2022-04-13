import { ProfileServiceOptions, ProfileRuleService, RuleService } from 'src/services';
import { AbstractDatabaseService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import { ProfileEntity, ProfilesList } from 'src/repositories/types';
import { clearTimestamp } from 'src/util';
import { Pagination } from 'src/core/domains';

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
		return super.read(options).then((result: ProfileEntity | ProfilesList) => ('data' in result) ? this.setProfiles(result)
	}



	private async setProfilePermissions(profile: ProfileEntity) {
		const id = Number(profile.id);

		profile.permissions = await this.findRulesByProfile(id);
		return profile;
	}

	private async findRulesByProfile(profileId: number) {
		const rulesId = await this.profileRulesService.read({profileId})

		return Array.isArray(rulesId)
			? rulesId.map(async rule => this.ruleService.read({ id: rule.ruleId }))
			: [];
	}

	private setProfiles(profiles: ProfilesList) {
		const data  = profiles.data.map(profile => clearTimestamp(profile));
		const pagination = new Pagination(profiles.pagination);

		return { data, pagination };
	}
}
