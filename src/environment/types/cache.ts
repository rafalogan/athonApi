import { ClientOpts } from 'redis';

export interface CacheConfigOptions {
	enableCache: boolean;
	cacheTime: number;
	client: ClientOpts;
}
