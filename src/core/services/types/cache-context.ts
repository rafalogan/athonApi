import { RedisClient } from 'redis';

export interface IkeyOptions {
	serviceName: string;
	id: any;
}

export interface ICServiceOptions {
	client: RedisClient;
	status: boolean;
}
