import { INoRelational } from 'src/config/types/database';

export default class NoRelationalDatabaseConfig implements INoRelational {
	connection?: string ;
	database = process.env.DBNR_DATABASE || 'athonApi';
	host = process.env.DBNR_HOST || 'localhost';
	password = process.env.DBNR_PASSWORD || '';
	port = Number(process.env.DBNR_PORT) || 27017;
	prefix = process.env.DBNR_PREFIX || 'mongodb';
	user = process.env.DBNR_USER || '';

	constructor() {
		this.connection = `${this.prefix}://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`
	}
}
