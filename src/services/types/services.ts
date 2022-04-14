import { RelationalReadOptions } from 'src/core/types';

export interface RulesReadOptions extends RelationalReadOptions {
	userId?: number;
	ruleId?: number;
}
