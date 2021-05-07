import redis, { ClientOpts, RedisClient } from 'redis';

import { LogHandler } from 'src/core/handlers';

export class CacheConnectionComponent {
	connection: RedisClient;
	connectonUp = false;

	constructor(private options: ClientOpts, private log: LogHandler) {
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
