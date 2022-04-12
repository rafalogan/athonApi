import httpStatus from 'http-status';

import { AbstractDatabaseService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { RulesReadOptions } from 'src/services/types/services';
import { clearTimestamp, existsOrError, notExistisOrError } from 'src/util';
import { UserRule, UserRuleEntity, UserRulesEntity } from 'src/repositories/entities';

const fields = ['user_id as userId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class UserRuleService extends AbstractDatabaseService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: UserRuleService.name, table: 'user_rules', fields });
	}

	createDataList(raw: UserRulesEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new UserRule(item)).map(clearTimestamp);

		return { data, pagination };
	}

	async validateFields(raw: UserRuleEntity) {
		const id = `${raw.userId}-${raw.ruleId}`;
		try {
			const fromDB = await this.read({ id });

			notExistisOrError(fromDB, 'This user already has that rule.');
			existsOrError(raw.userId, 'User filed is required.');
			existsOrError(raw.ruleId, 'Rule filed is required.');

			return new UserRule(raw);
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}
	}

	async read(options: RulesReadOptions): Promise<any> {
		if (this.enableCache) return this._findByCache(options);

		return options.id ? await this._findRuleByIds(options.id, options.fields) : await this._findAll(options);
	}

	async delete(id: string): Promise<any> {
		const [userId, ruleId] = id.split('-').map(Number);
		const element = await this.read({ id });

		try {
			existsOrError(element, 'User Ruler not found.');
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}

		return this.instance(this.table)
			.where({ rule_id: ruleId })
			.andWhere({ user_id: userId })
			.del()
			.then(result => ({ deleted: !!result, result, element }))
			.catch(err => this.log.error('Deleted User Rule failed', err));
	}

	findRulesByUserId(id: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ id })
			.then((result: any[]) => result)
			.catch(err => this.log.error(`find rules by User ${id} failed`, err));
	}

	private _findRuleByIds(id: string, cols?: string[]) {
		const [userId, ruleId] = id.split('-').map(Number);
		const columns = cols ?? this.fields;

		return this.instance(this.table)
			.select(...columns)
			.where({ userId })
			.andWhere({ ruleId })
			.first()
			.then((data: any) => data)
			.catch(err => this.log.error(`Find rule ${id} failed`, err));
	}

	private async _findByCache(options: RulesReadOptions) {
		const serviceName = this.serviceName;
		const id = options.id ?? 'list';

		return options.id
			? this.findCahce({ serviceName, id }, await this._findRuleByIds(id, options.fields), this.cacheTime)
			: this.findCahce({ serviceName, id }, await this._findAll(options), this.cacheTime);
	}
}
