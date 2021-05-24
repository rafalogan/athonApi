import { AbstractRelationalService, ICServiceOptions, IRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';

export class NewsletterService extends AbstractRelationalService {
	constructor(newsletterServiceOptions: IRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(newsletterServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
