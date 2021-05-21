import mongoose from 'mongoose';

import { INoRelationaContext } from 'src/core/services/types/no-relationa-context';
import { LogHandler } from 'src/core/handlers';
import { IPaginationOptions } from 'src/core/services/types/pagination';
import { existsOrError } from 'src/util/validate';
import { AbstractCacheService } from 'src/core/services/abstract-cache.service';
import { RedisClient } from 'redis';

export abstract class AbstractNoRelationalService<D extends mongoose.Document> extends AbstractCacheService implements INoRelationaContext {
	protected name: string;

	constructor(
		protected instanceModel: mongoose.Model<D>,
		protected enableCache: boolean,
		private serviceName: string,
		log: LogHandler,
		cacheClient: RedisClient,
		cachedSattus: boolean,
		env: string,
		protected cacheTime?: number
	) {
		super(cacheClient, cachedSattus, log, env);
		this.name = this.instanceModel.name;
	}

	create(values: any): Promise<any> {
		return this.instanceModel
			.create(values)
			.then(result => result)
			.catch(err => this.log.error(`Create Register on ${this.name}`, err));
	}

	read(options: IPaginationOptions, id?: any): Promise<any> {
		if (this.enableCache) return this._checkCache(options, id);
		return id ? this._findById(id) : this._findAll(options);
	}

	update(valies: any, _id: any): Promise<any> {
		return this.instanceModel
			.updateOne({ _id }, valies)
			.then(async result => {
				if (this.enableCache) await this._clearCache(_id);
				return { matched: result.n, modified: result.nModified };
			})
			.catch(err => this.log.error(`Update registe "${_id}" failed`, err));
	}

	async delete(_id: any): Promise<any> {
		const element = await this._findById(_id);

		try {
			existsOrError(element, `Registe "${_id}" doesn't exist`);
		} catch (msg) {
			return msg;
		}

		this.instanceModel
			.remove({ _id })
			.then(async result => {
				if (this.enableCache) await this._clearCache(_id);
				return { deleted: result.deletedCount, element };
			})
			.catch(err => this.log.error(`Delete registe "${_id}" failed`, err));
	}

	private _findById(_id: any): Promise<any> {
		return this.instanceModel
			.findById(_id)
			.then((item: any) => item)
			.catch(err => this.log.error(`Search register ${_id} failed on ${this.name}`));
	}

	private _findAll(options: IPaginationOptions) {
		const page = options.page ?? 1;
		const limit = options.total ?? 10;
		const skip = (page - 1) * limit;

		return this.instanceModel
			.countDocuments({})
			.exec()
			.then(count =>
				this.instanceModel
					.find()
					.skip(skip)
					.limit(limit)
					.then(data => ({
						data,
						pagination: {
							count,
							page,
							pages: Number(Math.ceil(count / limit)),
							limit,
						},
					}))
					.catch(err => this.log.error(`Find All registers fail on ${this.name}`, err))
			);
	}

	private _checkCache(options: IPaginationOptions, id: any) {
		return id
			? this.findCahce({ serviceName: this.serviceName, id }, () => this._findById(id), this.cacheTime)
			: this.findCahce({ serviceName: this.serviceName, id: 'list' }, () => this._findAll(options), this.cacheTime);
	}

	private async _clearCache(id: any = 'list') {
		if (id !== 'list') await this.deleteCahce({ serviceName: this.serviceName, id });
		return this.deleteCahce({ serviceName: this.serviceName, id: 'list' });
	}
}
