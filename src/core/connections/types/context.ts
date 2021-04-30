export interface IDatabaseContext {
	instance: any;
	table: string;

	create: (item: any) => Promise<void>;
	read: (id?: any, fields?: any[]) => Promise<any[] | any>;
	update: (item: any) => Promise<void>;
	delete: (id: any) => Promise<any>;
}

export interface IConnectionContext {
	connection: () => Promise<any | void>;
	latest?: () => Promise<any>;
	rollback?: () => Promise<any>;
}
