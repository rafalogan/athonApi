import { AbstractRelationalService, ICServiceOptions, IRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';

export class RuleService extends AbstractRelationalService {
	constructor(rulesServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(rulesServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
