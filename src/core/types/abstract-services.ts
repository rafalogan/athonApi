import { RedisClient } from 'redis';
import { LogController } from 'src/core/controller';
import mongoose from 'mongoose';
import { Knex } from 'knex';

export interface KeyOptions {
	serviceName: string;
	id: any;
}

export interface RelationalServiceOptions extends CacheServiceOptions {
	instance: Knex;
	table: string;
	fields: string[];
	enableCache: boolean;
	cacheTime?: number;
	serviceName: string;
}

export interface NoRelationalServiceOptions extends CacheServiceOptions {
	schema: string;
	instanceModel?: mongoose.Model<any>;
	enableCache: boolean;
	cacheTime?: number;
	serviceName: string;
}

export interface CacheServiceOptions {
	client: RedisClient;
	status: boolean;
	log: LogController;
	env: string;
}
