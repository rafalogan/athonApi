import { DatabaseConfigOptions, ServerConfigOptions } from 'src/environment';

export interface NoRelationalDBConfigOptions extends DatabaseConfigOptions, ServerConfigOptions {
	prefix: string;
}
