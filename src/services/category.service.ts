import { AbstractNoRelationalService } from 'src/core/services';
import { ICategoryModel } from 'src/core/entities/types/category';
import { ICServiceOptions, INRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class CategoryService extends AbstractNoRelationalService<ICategoryModel> {
	constructor(categorYServiceOptions: INRServiceOptions, cacheServiceOptions: ICServiceOptions, envServiceOptions: IEnvServiceOptions) {
		super(categorYServiceOptions, cacheServiceOptions, envServiceOptions);
	}
}
