import { promisify } from 'util';
import isEmpty from 'is-empty';
import { RedisClient } from 'redis';
import md5 from 'md5';

import { existsOrError } from 'src/util';
import { LogController } from 'src/core/controller';
import { CacheServiceOptions, KeyOptions } from 'src/core/types';

export abstract class AbstractCacheService {
	private _getAsync: (key: any) => Promise<any>;
	private _setAsync: (key: any, parseData: string, ex: string, parseTime: number) => Promise<any>;
	private _delAsync: (key: any) => Promise<any>;
	private client: RedisClient;
	private clientActive: boolean;

	protected isValidEnv: boolean;
	protected log: LogController;

	constructor(options: CacheServiceOptions) {
		this.client = options.client;
		this.clientActive = options.status;
		this.log = options.log;
		this.isValidEnv = options.env !== 'production';

		this._getAsync = promisify(this.client.get).bind(this.client);
		this._setAsync = promisify(this.client.set).bind(this.client);
		this._delAsync = promisify(this.client.del).bind(this.client);
	}

	private async _create(key: any, fn: () => Promise<any>, time?: number) {
		this._responseLog(`CACHEKEY: ${key}, creating...`, 'info');
		const data = await fn();

		if (data) await this._setCache(key, data, time);
		return data;
	}

	async findCahce(args: KeyOptions, fn: () => Promise<any>, time?: number) {
		const key = this._generateKey(args);

		if (!this.clientActive) return await fn();

		try {
			this._responseLog(`Search cache ${key}, waiting...`, 'info');
			const data = await this._getAsync(key);

			if (!data || isEmpty(data)) return await this._create(key, fn, time);
			return JSON.parse(data);
		} catch (err) {
			this._responseLog(`Find cache ${key} is failed`, 'error', err);
		}
	}

	async deleteCahce(args: KeyOptions) {
		if (!this.clientActive) return this._responseLog('Cache server disable', 'info');

		const key = this._generateKey(args);
		const data = await this._getAsync(key);

		try {
			existsOrError(data, `Cache key ${key} is not exists.`);
		} catch (msg) {
			return this._responseLog(msg, 'warn');
		}

		return this._delAsync(key)
			.then(() => this._responseLog(`Cache key ${key} is deleted with success.`, 'info'))
			.catch(err => this._responseLog(`Delete cache ${key} failed`, 'error', err));
	}

	private _generateKey(ags: KeyOptions) {
		try {
			existsOrError(ags, 'To generate the data key, the arguments must be filled in correctly');
			const argsToString = `GET:Content:${ags.serviceName}:${ags.id}`;

			return md5(argsToString);
		} catch (msg) {
			return this.log.error(msg);
		}
	}

	private _setCache(key: any, data: any, time?: number) {
		const convertTime = this.isValidEnv ? 10 : 60;
		const cacheTime = time ? time * convertTime : 5 * convertTime;
		const dataToString = JSON.stringify(data);

		return this._setAsync(key, dataToString, 'EX', cacheTime)
			.then(() => this._responseLog(`Cache ${key}, created with success!`, 'info'))
			.catch(err => this._responseLog(`Create cache failed`, 'error', err));
	}

	private _responseLog(msg: string, type: string, params?: any) {
		switch (type) {
			case 'info':
				if (this.isValidEnv) this.log.info(msg, params);
				break;
			case 'error':
				this.log.error(msg, params);
				break;
			case 'warn':
				this.log.warn(msg, params);
				break;
			default:
				break;
		}
	}
}
