export interface IRelational {
	client: string;
	connection: string | IConnection;
	pool?: IPool;
	migrations?: IMigration;
	timezone?: string;
}

export interface IConnection {
	host: string;
	database: string;
	user: string;
	password: string;
}

export interface IPool {
	min: number;
	max: number;
}

export interface IMigration {
	tableName: string;
	directory: string;
	extension: string[];
}
