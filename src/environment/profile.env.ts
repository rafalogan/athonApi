import {
	CacheConfigOptions,
	ConnectionDBOptions,
	NoRelationalDBConfigOptions,
	ProfileEnviromnet,
	RelationalDBConfigOptions,
	SecurityOptions,
	SqliteConnectionOptions,
} from 'src/environment/';
import { ClientOpts } from 'redis';

export class ProfileEnv implements ProfileEnviromnet {
	env: string = process.env.NODE_ENV || '';
	host: string = process.env.HOST || '';
	port: number = Number(process.env.PORT) || 0;
	timezone: string = process.env.TIMEZONE || '';
	relationalDatabase: RelationalDBConfigOptions;
	noRelationalDatabase: NoRelationalDBConfigOptions;
	cache: CacheConfigOptions;
	security: SecurityOptions;

	constructor() {
		this.relationalDatabase = this.setRelationalDatabase();
		this.noRelationalDatabase = this.setNoRelationalDatabase();
		this.cache = this.setCache();
		this.security = this.setSecurity();
	}

	private setRelationalDatabase(): RelationalDBConfigOptions {
		return {
			client: process.env.DB_CLIENT || '',
			port: Number(process.env.DB_PORT) || 0,
			connection: this.setConnection(),
		};
	}

	private setConnection(): ConnectionDBOptions | SqliteConnectionOptions {
		if (process.env.DB_FILENAME)
			return {
				filename: process.env.DB_FILENAME,
			};

		return {
			host: process.env.DB_HOST || '',
			user: process.env.DB_USER || '',
			password: process.env.DB_PASSWORD || '',
			database: process.env.DB_NAME || '',
		};
	}

	private setNoRelationalDatabase(): NoRelationalDBConfigOptions {
		return {
			prefix: process.env.DBNR_PREFIX || '',
			user: process.env.DBNR_USER || '',
			password: process.env.DBNR_PASSWORD || '',
			host: process.env.DBNR_HOST || '',
			port: Number(process.env.DBNR_PORT) || 0,
			database: process.env.DBNR_DATABASE || '',
		};
	}

	private setCache(): CacheConfigOptions {
		const client: ClientOpts = {
			host: process.env.REDISHOST || '',
			port: Number(process.env.REDISPORT) || 0,
		};

		return {
			enableCache: process.env.ENABLE_CACHE === 'tue',
			cacheTime: Number(process.env.CACHE_TIME) || 5,
			client,
		};
	}

	private setSecurity(): SecurityOptions {
		return {
			saltRounds: Number(process.env.SALT_ROUNDS) || 0,
			enableHTTPS: process.env.ENABLE_HTTPS === 'true',
			cert: process.env.CERT || '',
			key: process.env.KEY || '',
			passphrase: process.env.PASSPHRASE || '',
			authSecret: process.env.AUTHSECRET || '',
		};
	}
}
