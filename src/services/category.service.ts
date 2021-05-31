import { AbstractNoRelationalService, ICServiceOptions, INRServiceOptions } from 'src/core/services';
import { ICategoryModel } from 'src/core/domains';
import { IEnvServiceOptions } from 'src/services';

export class CategoryService extends AbstractNoRelationalService<ICategoryModel> {
	constructor(categorYServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(categorYServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
