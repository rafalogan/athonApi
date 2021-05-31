import { IAbstractRelationalServiceOptions, INRServiceOptions } from 'src/core/services';
import { ISecurity } from 'src/environment';

export interface IServicesOptions extends IAbstractRelationalServiceOptions, INRServiceOptions {
	salt: number;
	security: ISecurity;
}
