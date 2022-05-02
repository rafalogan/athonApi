import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { ProfileRuleService, RuleService } from 'src/services';
import { AbstractDatabaseService } from 'src/core/services';
import {
	ProfileEntity,
	ProfileRuleEntity,
	ProfilesList,
	RelationalReadOptions,
	RelationalServiceOptions,
	RuleEntity,
} from 'src/repositories/types';
import { Pagination } from 'src/repositories/models';
import { clearTimestampFields, existsOrError, notExistisOrError } from 'src/util';
import { Profile } from 'src/repositories/entities';

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

	async profileValeidate(profile: ProfileEntity | Profile) {
		const profileDB = await this.readOne(Number(profile?.id));

		notExistisOrError(profileDB, 'Title is required');
		existsOrError(profile.title, 'Title is required');
	}

	read(options?: RelationalReadOptions): Promise<ProfilesList | ProfileEntity> {
		return super
			.read(options)
			.then(async (result: ProfileEntity | ProfilesList) =>
				'data' in result ? this.setProfiles(result as ProfilesList) : this.setProfile(result as ProfileEntity)
			)
			.catch(error => error);
	}

	readOne(id: number, options?: RelationalReadOptions): Promise<ProfileEntity> {
		return super
			.findOneById(id, options)
			.then(async (result: ProfileEntity) => this.setProfile(result))
			.catch(error => error);
	}

	private async setProfile(profile: ProfileEntity): Promise<ProfileEntity> {
		const id = Number(profile.id);
		const permissions = await this.findRulesByProfile(id);

		return { ...profile, permissions };
	}

	private async findRulesByProfile(profileId: number): Promise<RuleEntity[]> {
		const rulesId = await this.profileRulesService.read({ profileId });

		return rulesId.map((rule: ProfileRuleEntity) => this.setRules(rule.ruleId)).map((item: RuleEntity) => clearTimestampFields(item)) || [];
	}

	private async setRules(id: number): Promise<RuleEntity> {
		return this.ruleService.read({ id }).then(rule => rule as RuleEntity);
	}

	private setProfiles(profiles: ProfilesList): ProfilesList {
		const data = profiles.data.map(profile => clearTimestampFields(profile));
		const pagination = new Pagination(profiles.pagination);

		return { data, pagination };
	}
}
