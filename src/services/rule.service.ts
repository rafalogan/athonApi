import { AbstractDatabaseService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { Rule } from 'src/repositories/entities';
import { clearTimestampFields, existsOrError, notExistisOrError } from 'src/util';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import { RuleEntity, RulesEntity } from 'src/repositories/types';
import { Pagination } from 'src/repositories/models';

const fields = ['id', 'name', 'description', 'created_at as createdAt', 'updated_at as updatedAt'];

export class RuleService extends AbstractDatabaseService {
	constructor(conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'rules', { ...options, fields });
	}

	read(options?: RelationalReadOptions): Promise<RulesEntity | RuleEntity> {
		return super
			.read(options)
			.then((result: RuleEntity | RulesEntity) => ('data' in result ? this.setRules(result) : result))
			.catch(err => err);
	}

	async validateFields(item: any) {
		try {
			const id = Number(item.id);
			const ruleDB = await this.read({ id });

			notExistisOrError(ruleDB, `Rule ID: ${id} already exists`);
			existsOrError(item.name, 'Rule Name is a required field.');
			existsOrError(item.description, 'Rule Description is a required field.');

			return new Rule(item);
		} catch (err) {
			return err;
		}
	}

	private setRules(result: RulesEntity): RulesEntity {
		const data = result.data.map((item: RuleEntity) => clearTimestampFields(item));
		const pagination = new Pagination(result.pagination);
		return { data, pagination };
	}
}
