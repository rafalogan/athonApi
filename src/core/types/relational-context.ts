export interface RelationalContext {
	create: (values: any) => Promise<any | void>;
	read: (options: RelationalReadOptions, id?: number) => Promise<any>;
	update: (values: any, id: number) => Promise<any | void>;
	delete: (id: number) => Promise<any | void>;
}

export interface RelationalReadOptions {
	id?: number;
	page?: number;
	limit?: number;
	fields?: string[];
}
