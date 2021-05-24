import { AbstractNoRelationalService, ICServiceOptions, INRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';
import { ISocialMediaModel } from 'src/core/entities';

export class SocialMediaService extends AbstractNoRelationalService<ISocialMediaModel> {
	constructor(socialMediaServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(socialMediaServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
