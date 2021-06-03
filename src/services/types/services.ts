import { RelationalServiceOptions } from 'src/core/types';
import { SecurityOptions } from 'src/environment';

export interface IServicesOptions extends RelationalServiceOptions {
	salt: number;
	security: SecurityOptions;
}

export interface RulesReadOptions {
	id?: string;
	page?: number;
	limit?: number;
	fields?: string[];
}
