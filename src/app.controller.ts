import { Logger } from 'winston';
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { ProfileEnv } from 'src/environment';
import AuthModule from 'src/modules/auth/auth.module';
import CoreModule from 'src/core/core.module';
import ServicesModule from 'src/services/services.module';

export class AppController {
	private _express: Application;
	private authModule: AuthModule;
	constructor(private coreModule: CoreModule, private profileEnv: ProfileEnv, private servicesModule: ServicesModule) {
		const { responseController, logController } = this.coreModule;
		const { authService } = this.servicesModule;

		this._express = express();
		this.authModule = new AuthModule({ authService, responseController, logController }, this.express);

		this.exec();
	}

	get express() {
		return this._express;
	}

	private exec() {
		this._configExpress();
		this._initModules();
	}

	private _configExpress() {
		this.express.use(cors());
		this.express.use(this._morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private _morganConfig() {
		const {
			loggerController: { logger },
		} = this.coreModule;
		const { env } = this.profileEnv;

		const format = env === 'development' || env === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private _initModules() {
		this.authModule.init();
	}
}
