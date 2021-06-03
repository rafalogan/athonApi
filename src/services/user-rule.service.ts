import httpStatus from 'http-status';

import { AbstractRelationalService } from 'src/core/services';
import { RelationalServiceOptions } from 'src/core/types';
import { RulesReadOptions } from 'src/services/types/services';
import { existsOrError, notExistisOrError } from 'src/util';
import { UserRule, UserRuleEntity } from 'src/entities';

const fields = ['user_id as userId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class UserRuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: UserRuleService.name, table: 'user_rules', fields });
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
