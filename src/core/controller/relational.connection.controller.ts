import knex, { Knex } from 'knex';
import Config = Knex.Config;

import { LogController } from 'src/core/handlers';
import { KnexConfig } from 'src/config';

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
}
