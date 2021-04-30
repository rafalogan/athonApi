import knex, { Knex } from 'knex';
import Config = Knex.Config;

import LogHandler from 'src/core/handlers/log.handler';
import KnexConfig from 'src/config/knex.config';

export default class RelationalConnectionComponent {
	connection: Knex;

	constructor(private file: KnexConfig, private log: LogHandler) {
		this.connection = knex(this.file as Config);
	}

	isConnected() {
		return this.connection
			.raw('SELECT 1+1 AS result')
			.then(result => this.log.info(`SUCCESS: Relational Database is Connected Active:${!!result}`))
			.catch((err: Error) => this.log.error('FAIL: Relational Database is not Connected', err));
	}
}
