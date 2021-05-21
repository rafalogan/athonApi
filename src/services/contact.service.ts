import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class ContactService extends AbstractRelationalService {
	constructor(contactServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(contactServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
