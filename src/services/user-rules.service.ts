import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class UserRulesService extends AbstractRelationalService {
	constructor(userServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(userServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
