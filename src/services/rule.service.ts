import httpStatus from 'http-status';

import { AbstractRelationalService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { ListRoules, Rule } from 'src/entities';
import { existsOrError, notExistisOrError } from 'src/util';

const fields = ['id', 'name', 'description', 'created_at as createdAt', 'updated_at as updatedAt'];

export class RuleService extends AbstractRelationalService {
	constructor(options: RelationalServiceOptions) {
		super({ ...options, serviceName: RuleService.name, table: 'rules', fields });
	}

	read(options?: RelationalReadOptions): Promise<ListRoules | Rule> {
		return super
			.read(options)
			.then(result => {
				if (result.data) return this._setRules(result);
				return new Rule(result);
			})
			.catch(err => this.log.error('find rule or rules failed', err));
	}

	async validateFields(item: any) {
		try {
			const id = Number(item.id);
			const ruleDB = id ? await this.read({ id }) : '';

			notExistisOrError(ruleDB, `Rule ID: ${id} already exists`);
			existsOrError(item.name, 'Rule Name is a required field.');
			existsOrError(item.description, 'Rule Description is a required field.');

			return new Rule(item);
		} catch (message) {
			return { code: httpStatus.BAD_REQUEST, message };
		}
	}

	private _setRules(result: any) {
		result.data = result.data.map ? result.data.map(this._roleNoTimestamp) : result.data;
		return result;
	}

	private _roleNoTimestamp(item: any) {
		const rule = new Rule(item);

		Reflect.deleteProperty(rule, 'createdAt');
		Reflect.deleteProperty(rule, 'updatedAt');
		return rule;
	}
}
