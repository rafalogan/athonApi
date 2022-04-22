import { RedisClientOptions } from 'redis';
import { ServerOptions } from 'https';

export interface IEnvironment {
	nodeEnv: string;
	port: number;
	host: string;
	salt: number;
	databaseEnv: IDatabaseEnvironment;
	cacheEnv?: ICacheEnvironment;
	security: ISecurityEnvironment;
	aws: IAWSEnvironment;
}

export interface IDatabaseEnvironment {
	client: string;
	connection: string | IConnectionConfigs;
}

export interface IAWSEnvironment {
	storageType: string;
	accessKeyId: string;
	secretAccessKey: string;
	region: string;
	bucket: string;
}

export interface ISecurityEnvironment extends ServerOptions {
	enableHTTPS: boolean;
	certFile: string;
	keyFile: string;
	authSecret: string;
}

export interface IConnectionConfigs {
	host?: string;
	database?: string;
	user?: string;
	password?: string;
	port?: number;
	filename?: string;
	urlConnection?: string;
	instanceName?: string;
	debug?: boolean;
	requestTimeout?: number;
}

export interface ICacheEnvironment extends RedisClientOptions {
	enableCache: boolean;
	cacheTime: number;
	host: string;
	port: number;
}
