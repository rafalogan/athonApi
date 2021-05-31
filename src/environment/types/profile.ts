import { CacheConfigOptions, NoRelationalDBConfigOptions, RelationalDBConfigOptions, SecurityOptions } from 'src/environment';

export interface ProfileEnviromnet extends ServerConfigOptions {
	env: string;
	timezone: string;
	relationalDatabase: RelationalDBConfigOptions;
	noRelationalDatabase: NoRelationalDBConfigOptions;
	cache: CacheConfigOptions;
	security: SecurityOptions;
}

export interface ServerConfigOptions {
	host: string;
	port: number;
}
