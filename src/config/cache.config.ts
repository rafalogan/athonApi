import { ClientOpts } from 'redis';

export default class CacheConfig implements ClientOpts {
	host= process.env.REDISHOST || 'localhost';
	port = Number(process.env.REDISPORT) || 6379;

	constructor() {}
}
