import mongoose from 'mongoose';

import { LogHandler } from 'src/core/handlers';
import { INoRelationalDatabase } from 'src/environment/types/no-relational-database';

export class NoRelationalConnectionComponent {
	private connectionString: string;
	connection: Promise<mongoose.Mongoose | void>;

	constructor(private profile: INoRelationalDatabase, private log: LogHandler) {
		this.connectionString = this._createConnectionString();
		this.connection = this.connect();
	}

	async connect() {
		return mongoose
			.connect(this.connectionString, { useCreateIndex: true, useNewUrlParser: true })
			.then(result => {
				this.log.info('SUCCESS: No Relational Database is connected');
				return result;
			})
			.catch((err: Error) => this.log.error(`FAIL: No Relational Database isn't connected`));
	}

	private _createConnectionString() {
		const { prefix, user, password, host, port, database } = this.profile;

		return `${prefix}://${user}:${password}@${host}:${port}/${database}?authSource=admin`;
	}
}
