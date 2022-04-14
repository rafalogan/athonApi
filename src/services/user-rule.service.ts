import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { PaginationOptions, RelationalServiceOptions } from 'src/core/types';
import { RulesReadOptions } from 'src/services/types/services';
import { clearTimestamp, existsOrError, notExistisOrError, onError } from 'src/util';
import { UserRuleEntity } from 'src/repositories/types';
import { UserRule } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';
import { AbstractDatabaseService } from 'src/core/services';

const fields = ['user_id as userId', 'rule_id as ruleId', 'created_at as createdAt', 'updated_at as updatedAt'];

export class UserRuleService extends AbstractDatabaseService {
	constructor(conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'user_rules', { ...options, fields });
	}

	async validateFields(raw: UserRuleEntity) {
		try {
			const { userId, ruleId } = raw;
			const fromDB = await this.read({ userId, ruleId });

			notExistisOrError(fromDB, 'This user already has that rule.');
			existsOrError(raw.userId, 'User filed is required.');
			existsOrError(raw.ruleId, 'Rule filed is required.');

			return new UserRule(raw);
		} catch (err) {
			return err;
		}
	}

	async read(options: RulesReadOptions) {
		if (this.clientActive) return this.checkCache(options);

		return options.userId || options.ruleId ? await this.readOne(options) : await this.readAll(options);
	}

	async delete(id: string) {
		const [userId, ruleId] = id.split('-').map(Number);
		const element = await this.read({ userId, ruleId });

		try {
			existsOrError(element, 'User Ruler not found.');
		} catch (err) {
			return err;
		}

		return this.instance(this.table)
			.where({ rule_id: ruleId })
			.andWhere({ user_id: userId })
			.del()
			.then(result => ({ deleted: !!result, result, element }))
			.catch(err => err);
	}

	private readOne(options: RulesReadOptions) {
		return this.instance(this.table)
			.select(...(options.fields || this.fields))
			.where({ user_id: options.userId })
			.orWhere({ rule_id: options.ruleId })
			.then((data: UserRuleEntity[]) => clearTimestamp(data))
			.catch(err => err);
	}

	private async readAll(options: RulesReadOptions) {
		const page = Number(options?.page || 1);
		const limit = Number(options.limit || 10);
		const count = await this.countRules();

		return this.instance(this.table)
			.select(...(options.fields || this.fields))
			.where({ user_id: options.userId })
			.orWhere({ rule_id: options.ruleId })
			.then((data: UserRuleEntity[]) => this.setRules(data, { page, limit, count }))
			.catch(err => err);
	}

	private countRules() {
		return this.instance(this.table)
			.count({ count: 'rules_id' })
			.first()
			.then((data: any) => Number(data.count))
			.catch(err => {
				onError('Count rules failed', err);
				return 0;
			});
	}

	private setRules(items: UserRuleEntity[], pagesOptions: PaginationOptions) {
		const data = items.map(item => clearTimestamp(item));
		const pagination = new Pagination(pagesOptions);

		return { data, pagination };
	}
}
