import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class NewsletterService extends AbstractRelationalService {
	constructor(newsletterServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(newsletterServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
