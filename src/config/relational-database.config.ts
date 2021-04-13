import { IConnection, IMigration, IPool, IRelational } from 'src/config/types/database';

export default class RelationalDatabaseConfig implements IRelational {
	client: string;
	connection: string | IConnection;
	pool: IPool;
	migrations: IMigration;
	timezone: string;

	constructor() {
		this.client = process.env.DB_CLIENT || 'pg';
		this.connection = this._setConnection();
		this.pool = this._setPool();
		this.migrations = this._setMigrations();
		this.timezone = process.env.TIMEZONE || 'America/Sao_Paulo';
	}

	private _setConnection(): IConnection {
		return {
			host: process.env.DB_HOST || 'localhost',
			database: process.env.DB_NAME || 'athon-db',
			user: process.env.DB_USER || '',
			password: process.env.DB_PASSWORD || '',
		}
	}

	private _setPool(): IPool {
		return {
			min: 0,
			max: 12
		}
	}

	private _setMigrations(): IMigration {
		return {
			tableName: 'knex_migrations',
			directory: 'migrations',
			extension: ['ts', 'js']
		}
	}

}
