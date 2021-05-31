import { AbstractNoRelationalService } from 'src/core/services';
import { ICServiceOptions, INRServiceOptions } from 'src/core/services/types';
import { IArticleModel } from 'src/core/domains/types/article';
import { IEnvServiceOptions } from 'src/services';

export class ArticleService extends AbstractNoRelationalService<IArticleModel> {
	constructor(articleServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(articleServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
