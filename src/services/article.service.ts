import { AbstractNoRelationalService } from 'src/core/services';
import { ICServiceOptions, INRServiceOptions } from 'src/core/services/types';
import { IArticleModel } from 'src/core/entities/types/article';
import { IEnvServiceOptions } from 'src/services/types';

export class ArticleService extends AbstractNoRelationalService<IArticleModel> {
	constructor(articleServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(articleServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
