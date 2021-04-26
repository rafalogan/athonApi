import { IProfileEnv } from 'src/environment/types/profile';
import { INoRelationalDatabase } from 'src/environment/types/no-relational-database';
import { ICache } from 'src/environment/types/cache';
import { ISecurity } from 'src/environment/types/security';
import { IConnection, IConnectionSqlite, IRelationalDatabase } from 'src/environment/types/relational-database';

export default class ProfileEnv implements IProfileEnv {
	env: string = process.env.NODE_ENV || '';
	host: string = process.env.HOST || '';
	port: number = Number(process.env.PORT) || 0;
	timezone: string = process.env.TIMEZONE || '';
	relationalDatabase: IRelationalDatabase;
	noRelationalDatabase: INoRelationalDatabase;
	cache: ICache;
	security: ISecurity;

	constructor() {
		this.relationalDatabase = this.setRelationalDatabase();
		this.noRelationalDatabase = this.setNorelationalDatabase();
		this.cache = this.setCache();
		this.security = this.setSecurity();
	}

	private setRelationalDatabase(): IRelationalDatabase {
		return {
			client: process.env.DB_CLIENT || '',
			port: Number(process.env.DB_PORT) || 0,
			connection: this.setConnection(),
		};
	}

	private setConnection(): IConnection | IConnectionSqlite {
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

	private setNorelationalDatabase(): INoRelationalDatabase {
		return {
			prefix: process.env.DBNR_PREFIX || '',
			user: process.env.DBNR_USER || '',
			password: process.env.DBNR_PASSWORD || '',
			host: process.env.DBNR_HOST || '',
			port: Number(process.env.DBNR_PORT) || 0,
			database: process.env.DBNR_DATABASE || '',
		};
	}

	private setCache(): ICache {
		return {
			host: process.env.REDISHOST || '',
			port: Number(process.env.REDISPORT) || 0,
		};
	}

	private setSecurity(): ISecurity {
		return {
			saltRounds: Number(process.env.SALT_ROUNDS) || 0,
			EnableHTTPS: process.env.ENABLE_HTTPS === 'true',
			cert: process.env.CERT || '',
			key: process.env.KEY || '',
			authSecret: process.env.AUTHSECRET || '',
		};
	}
}
