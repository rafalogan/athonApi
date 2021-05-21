import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class RulesService extends AbstractRelationalService {
	constructor(rulesServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(rulesServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
