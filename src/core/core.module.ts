import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Logger } from 'winston';

export default class CoreModule {
	private readonly _express: Application;

	constructor(private emv: string, private logger: Logger) {
		this._express = express();

		this.expressInit();
		this.modules();
	}

	get express(): Application {
		return this._express;
	}

	private expressInit() {
		this.express.use(cors());
		this.express.use(this._morganConfig());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private _morganConfig() {
		const format = this.emv === 'development' || this.emv === 'test' ? 'dev' : 'combined';
		const stream = {
			write: (message: string) => this.logger.info(message.trim()),
		};

		return morgan(format, { stream });
	}

	private modules() {
		this.express.get('/', (req: Request, res: Response) => res.status(200).json({ status: 200, message: "OK: Api ist work's" }));
	}
}
