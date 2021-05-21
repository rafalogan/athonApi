import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class ProfileRulesService extends AbstractRelationalService {
	constructor(profileRulesServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(profileRulesServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
