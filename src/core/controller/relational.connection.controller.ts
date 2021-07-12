import knex, { Knex } from 'knex';
import Config = Knex.Config;
import MigratorConfig = Knex.MigratorConfig;

import { KnexConfig } from 'src/config';
import { LogController } from 'src/core/controller/log.controller';

export class RelationalConnectionController {
	connection: Knex;

	constructor(private file: KnexConfig, private log: LogController) {
		this.connection = knex(this.file as Config);
	}

	isConnected() {
		return this.connection
			.raw('SELECT 1+1 AS result')
			.then(result => this.log.info(`SUCCESS: Relational Database is Connected Active:${!!result}`))
			.catch((err: Error) => this.log.error('FAIL: Relational Database is not Connected', err));
	}

	latest() {
		return this.connection.migrate
			.latest(this.file as MigratorConfig)
			.then(() => this.log.info('Relational Databaes Updated!'))
			.catch(err => this.log.error('Erro on updated relational Database.', err));
	}

	rollback() {
		return this.connection.migrate
			.rollback(this.file as MigratorConfig)
			.then(() => this.log.info('Relational Database is clear.'))
			.catch(err => this.log.error('Error on clear relational database.', err));
	}
}
