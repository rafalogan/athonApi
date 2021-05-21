import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class UserService extends AbstractRelationalService {
	constructor(userServiceOptions: IRServiceOptions, cacheOptions: ICServiceOptions, env: IEnvServiceOptions) {
		super(userServiceOptions, cacheOptions, env);
	}
}
