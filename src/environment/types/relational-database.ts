export interface RelationalDBConfigOptions {
	client: string;
	port?: number;
	connection: string | ConnectionDBOptions | SqliteConnectionOptions;
}

export interface ConnectionDBOptions extends DatabaseConfigOptions {
	host: string;
}

export interface SqliteConnectionOptions {
	filename: string;
}

export interface DatabaseConfigOptions {
	user: string;
	password: string;
	database: string;
}
