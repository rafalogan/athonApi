import { AbstractRelationalService, ICServiceOptions, IRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';

export class UserRuleService extends AbstractRelationalService {
	constructor(userServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(userServiceOptions, cacheServiceOptions, envServiceOptions);
	}

	findRulesByUserId(id: number) {
		return this.instance(this.table)
			.select('rule_id as ruleId')
			.where({ id })
			.then(result => result)
			.catch(err => this.log.error(`find rules by User ${id} failed`, err));
	}
}
