import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class AnswerService extends AbstractRelationalService {
	constructor(answerServiceOptions: IRServiceOptions, cacheOptions: ICServiceOptions, envOptions: IEnvServiceOptions) {
		super(answerServiceOptions, cacheOptions, envOptions);
	}
}
