import { IConnection, IConnectionSqlite } from 'src/environment/types/relational-database';
import { IProfile } from 'src/environment/types/profile';
import { IKnexFile, IMigration, IPool } from 'src/config/types/knex-file';

export default class KnexConfig implements IKnexFile {
	client: string;
	version?: string;
	connection: string | IConnection | IConnectionSqlite;
	pool: IPool;
	migration: IMigration;
	timezone: string;

	constructor(private profile: IProfile) {
		const { relationalDatabase, timezone } = this.profile;

		this.client = relationalDatabase.client;
		this.connection = relationalDatabase.connection;
		this.pool = this.setPool();
		this.migration = this.setMigration();
		this.timezone = timezone;
	}

	getFile(): IKnexFile {
		return {
			client: this.client,
			version: this.version ? this.version : '',
			connection: this.connection,
			pool: this.pool,
			migration: this.migration,
			timezone: this.timezone,
		};
	}

	private setPool(): IPool {
		return {
			min: 1,
			max: 10,
		};
	}

	private setMigration(): IMigration {
		return {
			tableName: 'knex_migrations',
			directory: 'migrations',
			extension: 'ts',
		};
	}
}
