import { AbstractNoRelationalService, ICServiceOptions, INRServiceOptions } from 'src/core/services';
import { IEnvServiceOptions } from 'src/services/types/enviroment-service';
import { IMediaModel } from 'src/core/entities';

export class MediaService extends AbstractNoRelationalService<IMediaModel> {
	constructor(mediaServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(mediaServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
