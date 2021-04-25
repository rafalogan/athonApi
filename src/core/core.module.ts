import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

export default class CoreModule {
	private readonly _express: Application;

	constructor(private logger: Logger) {
		this._express = express();

		this.expressInit();
		this.modules();
	}

	get express(): Application {
		return this._express;
	}

	private expressInit() {
		this.express.use(cors());
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.express.use(morgan('combined', { stream: this.logger.stream }));
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private modules() {}
}
