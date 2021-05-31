import redis, { ClientOpts, RedisClient } from 'redis';

import { LogController } from 'src/core/controller/log.controller';

export class CacheConnectionController {
	connection: RedisClient;
	connectonUp = false;

	constructor(private options: ClientOpts, private log: LogController) {
		this.connection = this._connect();
	}

	private _connect() {
		return redis
			.createClient(this.options)
			.on('connect', () => this._onConnect())
			.on('ready', () => this._onReady())
			.on('error', () => this._onError());
	}

	private _onConnect() {
		return this.log.info('SUCCESS: Cache(Redis) is connected');
	}

	private _onReady() {
		this.connectonUp = true;
		return this.log.info('ONLINE: Cache Redis...');
	}

	private _onError() {
		return this.log.error('FAILED: Cache Redis is not connected');
	}
}
