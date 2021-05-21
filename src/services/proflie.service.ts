import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class ProflieService extends AbstractRelationalService {
	constructor(proflieServiceOptions: IRServiceOptions, cacheOptions: ICServiceOptions, env: IEnvServiceOptions) {
		super(proflieServiceOptions, cacheOptions, env);
	}
}
