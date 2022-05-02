import { IDatabaseEnvironment, IknexConnection, IKnexFile, IKnexMigrationConfig, IKnexPoolConfig } from 'src/repositories/types';

export class KnexFileConfig implements IKnexFile {
	client: string;
	connection: string | IknexConnection;
	migrations: IKnexMigrationConfig;
	pool: IKnexPoolConfig;
	useNullAsDefault = true;

	constructor(databaseEnv: IDatabaseEnvironment, migrationConfig?: IKnexMigrationConfig, poolConfig?: IKnexPoolConfig) {
		this.client = databaseEnv.client || 'pg';
		this.connection = this.setConexionConfigs(databaseEnv);
		this.pool = this.setPoolConfigs(poolConfig);
		this.migrations = this.setMigrationConfig(migrationConfig);
	}

	setPoolConfigs(poolConfig?: IKnexPoolConfig) {
		return {
			...poolConfig,
			min: poolConfig?.min || 2,
			max: poolConfig?.max || 20,
		};
	}

	setMigrationConfig(migrationConfig?: IKnexMigrationConfig): IKnexMigrationConfig {
		return {
			...migrationConfig,
			tableName: migrationConfig?.tableName || 'knex_migrations',
			directory: migrationConfig?.directory || './database/migrations',
			extension: migrationConfig?.extension || 'ts',
		};
	}

	private setConexionConfigs(env: IDatabaseEnvironment): string | IknexConnection {
		return typeof env.connection === 'string'
			? env.connection
			: {
					host: env.connection.host,
					port: env.connection.port,
					user: env.connection.user,
					password: env.connection.password,
					database: env.connection.database,
					filename: env.connection.filename,
			  };
	}
}
