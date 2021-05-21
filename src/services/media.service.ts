import { AbstractNoRelationalService } from 'src/core/services';
import { IMediaModel } from 'src/core/entities/types/media';
import { ICServiceOptions, INRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class MediaService extends AbstractNoRelationalService<IMediaModel> {
	constructor(mediaServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(mediaServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
