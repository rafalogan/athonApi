import { IMediaModel } from 'src/entities';
import { AbstractNoRelationalService } from 'src/core/services';
import { NoRelationalServiceOptions } from 'src/core/types';

export class MediaService extends AbstractNoRelationalService<IMediaModel> {
	constructor(options: NoRelationalServiceOptions) {
		super({ ...options, serviceName: MediaService.name, schema: 'Media' });
	}
}
