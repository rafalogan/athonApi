import { ICacheEnvironment, IDatabaseEnvironment, IEnvironment, ISecurityEnvironment } from 'src/repositories/types';

export class Environment implements IEnvironment {
	nodeEnv: string;
	port: number;
	host: string;
	salt: number;
	databaseEnv: IDatabaseEnvironment;
	cacheEnv?: ICacheEnvironment;
	security: ISecurityEnvironment;

	baseUrl: string;

	constructor(props?: IEnvironment) {
		this.nodeEnv = props?.nodeEnv || process.env.NODE_ENV || 'development';
		this.port = props?.port || Number(process.env.PORT);
		this.host = props?.host || process.env.HOST || 'localhost';
		this.salt = props?.salt || Number(process.env.SALT) || 10;
		this.databaseEnv = this.setConnection(props?.databaseEnv);
		this.cacheEnv = this.setCacheConfigs(props?.cacheEnv);
		this.security = this.setSecurity(props?.security);

		this.baseUrl = `${this.security.enableHTTPS ? 'https' : 'http'}://${this.host}:${this.port}`;
	}

	private setConnection(dataEvn?: IDatabaseEnvironment): IDatabaseEnvironment {
		if (dataEvn) return dataEvn;

		return {
			client: process.env.DB_CLIENT || 'postgres',
			connection: process.env.DB_CONNECTION || {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				port: Number(process.env.DB_PORT),
				debug: process.env.DB_LOGGING === 'true',
				filename: process.env.DB_FILENAME,
			},
		};
	}

	setSecurity(dataSecurity?: ISecurityEnvironment): ISecurityEnvironment {
		if (dataSecurity) return dataSecurity;

		return {
			enableHTTPS: process.env.ENABLE_HTTPS === 'true',
			certFile: process.env.CERT_FILE || '',
			keyFile: process.env.KEY_FILE || '',
			authSecret: process.env.AUTHSECRET || '',
		};
	}

	setCacheConfigs(dataCache?: ICacheEnvironment): ICacheEnvironment {
		if (dataCache) return dataCache;

		return {
			host: process.env.REDISHOST || 'localhost',
			port: Number(process.env.CACHE_PORT) || 6379,
			password: process.env.CACHE_PASSWORD || '',
			db: Number(process.env.CACHE_DB) || 0,
		};
	}
}
