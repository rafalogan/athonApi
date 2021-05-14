import { IPagination, IPaginationOptions } from 'src/core/services/types/pagination';

export interface IRelationalContext {
	create: (values: any) => Promise<any | void>;
	read: (options: IRPginationOptions, id?: number) => Promise<any>;
	update: (values: any, id: number) => Promise<any | void>;
	delete: (id: number) => Promise<any | void>;
	pagination: (page: number, count: number, limit: number) => IPagination;
}

export interface IRPginationOptions extends IPaginationOptions {
	fields?: string[];
}
