import knex, { Knex } from 'knex';
import Config = Knex.Config;
import MigratorConfig = Knex.MigratorConfig;

import { onError, onInfo, TERMINAL_COLORS } from 'src/util';

const { greenBg, black, reset, red, cyan } = TERMINAL_COLORS;

export class ConnectionController {
	connection: Knex;

	constructor(private file: Config) {
		this.connection = knex(this.file as Config);
	}

	isConnected() {
		return this.connection
			.raw('SELECT 1+1 AS result')
			.then(result =>
				onInfo(`${greenBg + black}SUCCESS:${reset} Relational Database is Connected Active: ${result ? cyan : red}${!!result}${reset}`)
			)
			.catch((err: Error) => onError('FAIL: Relational Database is not Connected', err));
	}

	latest() {
		return this.connection.migrate
			.latest(this.file as MigratorConfig)
			.then(() => onInfo('Database is updated!'))
			.catch(err => onError('Erro on updated Database.', err));
	}

	rollback() {
		return this.connection.migrate
			.rollback(this.file as MigratorConfig)
			.then(() => onInfo('Database is clear.'))
			.catch(err => onError('Error on clear database.', err));
	}
}
