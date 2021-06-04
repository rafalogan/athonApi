import httpStatus from 'http-status';

import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { ProfileRule, ProfileRuleEntity, ProfileRuleListEntity } from 'src/entities';
import { RulesReadOptions } from 'src/services';
import { Pagination } from 'src/core/domains';
import { existsOrError, notExistisOrError } from 'src/util';

const fields = ['profile_id as profileId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class ProfileRuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: ProfileRuleService.name, table: 'profiles_rules', fields });
	}

	createProfileRuleList(raw: ProfileRuleListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new ProfileRule(item)).map(this._clearTimesTamp);

		return { data, pagination };
	}

	async validateRequireFields(data: ProfileRuleEntity) {
		const id = `${data.profileId}-${data.ruleId}`;
		try {
			const ProfileRuleDB = await this.read({ id });

			notExistisOrError(ProfileRuleDB, 'This rule already exist for this profile.');
			existsOrError(data.profileId, 'Field Profile is Required.');
			existsOrError(data.ruleId, 'Field Rule is Required.');

			return new ProfileRule(data);
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}
	}

	async read(options: RulesReadOptions) {
		if (this.enableCache) return await this._findBycache(options);

		return options.id ? this._findRuleById(options.id, options.fields) : this._findAllProfileRules(options);
	}

	async delete(id: string): Promise<any> {
		const [profileId, ruleId] = id.split('-').map(Number);
		const element = await this.read({ id });

		try {
			existsOrError(element, 'this Profile Rule is not exists');
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}

		return this.instance(this.table)
			.where({ profile_id: profileId })
			.andWhere({ rule_id: ruleId })
			.del()
			.then(result => ({ deleted: !!result, result, element }))
			.catch(err => this.log.error(`Deleted ${id} failed`, err));
	}

	findRulesByProfileId(profileId: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ profile_id: profileId })
			.then(rules => rules)
			.catch(err => this.log.error(`Find rules by profile ${profileId} failed`, err));
	}

	private _findRuleById(id: string, col?: string[]) {
		const [profileId, ruleId] = id.split('-').map(Number);
		const columns = col ?? this.fields;

		return this.instance(this.table)
			.select(...columns)
			.where({ profileId })
			.andWhere({ ruleId })
			.first()
			.then((data: any) => data)
			.catch(err => this.log.error('Find rule is failed', err));
	}

	private async _findAllProfileRules(options: RulesReadOptions): Promise<any> {
		const cols = options.fields ?? this.fields;
		const page = options.page ?? 1;
		const limit = options.limit ?? 10;
		const count = await this.countById();
		const pagination = new Pagination({ page, limit, count });

		return this.instance(this.table)
			.select(...cols)
			.limit(limit)
			.offset(page * limit - limit)
			.orderBy('id')
			.then((data: any) => ({ data, pagination }))
			.catch(err => this.log.error('Find rules is failed', err));
	}

	private async _findBycache(options: RulesReadOptions) {
		return options.id
			? await this._findCacheById(options.id, options.fields)
			: this.findCahce({ serviceName: this.serviceName, id: 'list' }, await this._findAllProfileRules(options), this.cacheTime);
	}

	private async _findCacheById(id: string, cols?: string[]) {
		return this.findCahce({ serviceName: this.serviceName, id }, await this._findRuleById(id, cols), this.cacheTime);
	}

	private _clearTimesTamp(data: ProfileRule) {
		Reflect.deleteProperty(data, 'createdAt');
		Reflect.deleteProperty(data, 'updatedAt');

		return data;
	}
}
