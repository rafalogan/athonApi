import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { SecurityOptions } from 'src/environment';

export interface IServicesOptions extends RelationalServiceOptions {
	salt: number;
	security: SecurityOptions;
}

export interface RulesReadOptions extends RelationalReadOptions {
	userId?: number;
	ruleId?: number;
}
