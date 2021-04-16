export interface IRelationalDatabase {
	client: string;
	port?: number;
	connection: string | IConnection | IConnectionSqlite;
}

export interface IConnection extends IDatabase {
	host: string;
}

export interface IConnectionSqlite {
	filename: string;
}

export interface IDatabase {
	user: string;
	password: string;
	database: string;
}
