import httpStatus from 'http-status';

import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { AbstractDatabaseService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { ProfileRule } from 'src/repositories/entities';
import { Pagination } from 'src/core/domains';
import { existsOrError, notExistisOrError, onError } from 'src/util';
import { ProfileRuleEntity, ReadRulesOptions } from 'src/repositories/types';

const fields = ['profile_id as profileId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class ProfileRuleService extends AbstractDatabaseService {
	constructor(conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'profiles_rules', { ...options, fields });
	}

	async validateRequireFields(data: ProfileRuleEntity) {
		try {
			const { profileId, ruleId } = data;
			const ProfileRuleDB = await this.read({ profileId, ruleId });

			notExistisOrError(ProfileRuleDB, 'This rule already exist for this profile.');
			existsOrError(data.profileId, 'Field Profile is Required.');
			existsOrError(data.ruleId, 'Field Rule is Required.');

			return new ProfileRule(data);
		} catch (err) {
			return err;
		}
	}

	async read(options?: ReadRulesOptions) {
		const id = `${options?.profileId}-${options?.ruleId}`;

		if (this.clientActive) return this.checkCache({ ...options, id });

		return options?.ruleId || options?.profileId ? this.readOne(options) : this.readAll(options);
	}

	async delete(id: string): Promise<any> {
		const [profileId, ruleId] = id.split('-').map(Number);
		const element = await this.read({ profileId, ruleId });

		try {
			existsOrError(element, 'this Profile Rule is not exists');
		} catch (error) {
			return error;
		}

		return this.instance(this.table)
			.where({ profile_id: profileId })
			.andWhere({ rule_id: ruleId })
			.del()
			.then(result => ({ deleted: !!result, result, element }))
			.catch(err => err);
	}

	private readOne(options?: ReadRulesOptions) {
		return this.instance(this.table)
			.select(...(options?.fields || this.fields))
			.where({ profile_id: options?.profileId })
			.orWhere({ rule_id: options?.ruleId })
			.then((data: ProfileRuleEntity[]) => data)
			.catch(err => err);
	}

	private async readAll(options?: ReadRulesOptions) {
		const page = Number(options?.page ?? 1);
		const limit = Number(options?.limit ?? 10);
		const count = await this.countById();

		return this.instance(this.table)
			.select(...(options?.fields || this.fields))
			.offset(page * limit - limit)
			.then((data: ProfileRuleEntity[]) => ({ data, pagination: new Pagination({ page, limit, count }) }))
			.catch(err => err);
	}

	protected async countById() {
		return this.instance(this.table)
			.count({ count: 'profile_id' })
			.first()
			.then((data: any) => Number(data.count))
			.catch(err => {
				onError('Count profiles is failed', err);
				return 0;
			});
	}
}
