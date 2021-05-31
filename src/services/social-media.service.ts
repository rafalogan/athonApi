import { AbstractNoRelationalService, ICServiceOptions, INRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';
import { ISocialMediaModel } from 'src/core/domains';

export class SocialMediaService extends AbstractNoRelationalService<ISocialMediaModel> {
	constructor(socialMediaServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(socialMediaServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
