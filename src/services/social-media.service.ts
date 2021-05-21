import { AbstractNoRelationalService } from 'src/core/services';
import { ISocialMediaModel } from 'src/core/entities/types/social-media';
import { ICServiceOptions, INRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class SocialMediaService extends AbstractNoRelationalService<ISocialMediaModel> {
	constructor(socialMediaServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(socialMediaServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
