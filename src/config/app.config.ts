import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

import { notfoundRoute } from 'src/core/routes';

export class AppConfig {
	private readonly _express: Application;

	constructor(private nodeEnv: string, private logger: Logger) {
		this._express = express();

		this.configExpress();
		this.initRoutes();
	}

	get express(): Application {
		return this._express;
	}

	private configExpress(): void {
		this.express.use(cors());
		this.express.use(this.morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private morganConfig() {
		const format = this.nodeEnv === 'development' || this.nodeEnv === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => this.logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private initRoutes(): void {
		this.express.use(notfoundRoute);
	}
}
