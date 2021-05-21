import { Knex } from 'knex';

import { IPagination, IPaginationOptions } from 'src/core/services/types/pagination';
import { LogHandler } from 'src/core/handlers';

export interface IRelationalContext {
	create: (values: any) => Promise<any | void>;
	read: (options: IRPginationOptions, id?: number) => Promise<any>;
	update: (values: any, id: number) => Promise<any | void>;
	delete: (id: number) => Promise<any | void>;
	pagination: (page: number, count: number, limit: number) => IPagination;
}

export interface IRPginationOptions extends IPaginationOptions {
	id?: number;
	fields?: string[];
}

export interface IRServiceOptions {
	serviceName: string;
	instance: Knex;
	table: string;
	fields?: string[];
	log: LogHandler;
}
