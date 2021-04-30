import { Knex } from 'knex';
import MigratorConfig = Knex.MigratorConfig;

import { IConnection, IConnectionSqlite, IRelationalDatabase } from 'src/environment/types/relational-database';
import { IKnexFile, IMigration, IPool } from 'src/config/types/knex-file';

export default class KnexConfig implements IKnexFile {
	client: string;
	version?: string;
	connection: string | IConnection | IConnectionSqlite;
	pool: IPool;
	migration: IMigration;
	timezone: string;

	constructor(props: IRelationalDatabase, timezone: string, version = '') {
		this.client = props.client;
		this.connection = props.connection;
		this.version = version;
		this.pool = this.setDefaultPool();
		this.migration = this.setDefaultMigration();
		this.timezone = timezone;
	}

	private setDefaultPool(): IPool {
		return {
			min: 1,
			max: 10,
		};
	}

	private setDefaultMigration(): IMigration {
		return {
			tableName: 'knex_migrations',
			directory: 'migrations',
			extension: 'ts',
		};
	}
}
