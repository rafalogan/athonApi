import { AbstractRelationalService, ICServiceOptions, IRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services';

export class ContactService extends AbstractRelationalService {
	constructor(contactServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(contactServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
