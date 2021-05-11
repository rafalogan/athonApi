export interface IRelationalContext {
	fields?: string[];

	create: (values: any) => Promise<any | void>;
	read: (options: IReadOptions, id?: number) => Promise<any>;
	update: (values: any, id: number) => Promise<any | void>;
	delete: (id: number) => Promise<any | void>;
	pagination: (page: number, count: number, limit: number) => IPagination;
}

export interface IReadOptions {
	page?: number;
	total?: number;
	fields?: string[];
}

export interface IPagination {
	count: number;
	page: number;
	pages: number;
	limit: number;
}
