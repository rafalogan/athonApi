import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

import { ApiModule } from 'src/api/api.module';
import { ServicesModule } from 'src/services';
import { DEFAULT_CORSOPTIONS } from 'src/util';
import { AuthConfig } from 'src/config/auth.config';

export class AppConfig {
	private readonly _express: Application;

	constructor(private nodeEnv: string, private logger: Logger, private authConfig: AuthConfig, private services: ServicesModule) {
		this._express = express();

		this.configExpress();
	}

	get express(): Application {
		return this._express;
	}

	private configExpress(): void {
		this.express.use(cors(DEFAULT_CORSOPTIONS));
		this.express.use(this.morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
		this.initApi();
	}

	private morganConfig() {
		const format = this.nodeEnv === 'development' || this.nodeEnv === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => this.logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private initApi(): void {
		return new ApiModule(this.express, this.authConfig, this.services).exec();
	}
}
