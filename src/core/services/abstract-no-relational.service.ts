import mongoose from 'mongoose';

import { INoRelationaContext, NoRelationalReadOptions, NoRelationalServiceOptions } from 'src/core/types';
import { existsOrError, ResponseException } from 'src/util';
import { AbstractCacheService } from 'src/core/services/abstract-cache.service';
import { Pagination } from 'src/core/domains';
import httpStatus from 'http-status';

export abstract class AbstractNoRelationalService<D extends mongoose.Document> extends AbstractCacheService implements INoRelationaContext {
	protected schema: string;
	protected instanceModel: mongoose.Model<D>;
	protected enableCache: boolean;
	protected cacheTime?: number;

	private serviceName: string;

	constructor(options: NoRelationalServiceOptions) {
		super(options);
		this.instanceModel = options.instanceModel;
		this.enableCache = options?.enableCache || false;
		this.cacheTime = options.cacheTime;
		this.schema = options.serviceName;
		this.serviceName = options.serviceName;
	}

	create(values: any): Promise<any> {
		return this.instanceModel
			.create(values)
			.then(result => result)
			.catch(err => this.log.error(`Create Register on ${this.schema}`, err));
	}

	read(options: NoRelationalReadOptions): Promise<any> {
		const { _id } = options;

		if (this.enableCache) return this._checkCache(options);
		return _id ? this._findById(_id) : this._findAll(options);
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

	async delete(_id: any) {
		const element = await this._findById(_id);

		try {
			existsOrError(element, `Registe "${_id}" doesn't exist`);
		} catch (message) {
			const err = new ResponseException(message);
			return { status: httpStatus.BAD_REQUEST, message, err };
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
			.catch(err => this.log.error(`Search register ${_id} failed on ${this.schema}`));
	}

	private _findAll(options: NoRelationalReadOptions) {
		const page = options.page ?? 1;
		const limit = options.limit ?? 10;
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
						pagination: new Pagination({ page, limit, count }),
					}))
					.catch(err => this.log.error(`Find All registers fail on ${this.schema}`, err))
			);
	}

	private _checkCache(options: NoRelationalReadOptions) {
		const { _id } = options;

		return _id
			? this.findCahce({ serviceName: this.serviceName, id: _id }, () => this._findById(_id), this.cacheTime)
			: this.findCahce({ serviceName: this.serviceName, id: 'list' }, () => this._findAll(options), this.cacheTime);
	}

	private async _clearCache(_id: any = 'list') {
		if (_id !== 'list') await this.deleteCahce({ serviceName: this.serviceName, id: _id });
		return this.deleteCahce({ serviceName: this.serviceName, id: 'list' });
	}
}
