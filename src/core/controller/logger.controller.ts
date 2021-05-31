import winston, { addColors, Logger, LoggerOptions } from 'winston';

import { LoggerConfig } from 'src/config';

export class LoggerController {
	logger: Logger;
	private env: string;

	constructor(env: string) {
		this.env = env;

		this._initColors();
		this.logger = this.initLogger();
	}

	initLogger() {
		const options = this._getOpitions();

		return new LoggerConfig(options).logger;
	}

	private _getOpitions(): LoggerOptions {
		const levels = {
			error: 0,
			warn: 1,
			info: 2,
			http: 3,
			debug: 4,
		};
		const format = this._setformat();
		const transports = this._setTransports();

		return {
			level: this._setLevel(),
			levels,
			format,
			transports,
			exitOnError: false,
		};
	}

	private _getColors() {
		return {
			error: 'red',
			warn: 'yellow',
			info: this._isDevelopment() ? 'cyan' : 'green',
			http: 'magenta',
			debug: 'white',
		};
	}

	private _initColors() {
		return addColors(this._getColors());
	}

	private _isDevelopment() {
		return this.env === 'development';
	}

	private _setLevel() {
		return this._isDevelopment() ? 'debug' : 'info';
	}

	private _setformat() {
		const timestamp = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
		const colorize = winston.format.colorize({ all: true });
		const print = winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

		return winston.format.combine(timestamp, colorize, print);
	}

	private _setTransports() {
		const format = this._setformat();
		const filesConfig = {
			handleExceptions: true,
			maxsize: 52428800,
			maxFiles: 5,
		};

		const prodTransports = [
			new winston.transports.File({ filename: 'logs/all.log', ...filesConfig }),
			new winston.transports.File({ filename: 'logs/error.log', level: 'error', ...filesConfig }),
			new winston.transports.Console({ level: 'debug', format }),
		];

		const devTransports = [new winston.transports.Console({ level: 'debug', format })];

		return this.env === 'production' || this.env === 'homologation' ? prodTransports : devTransports;
	}
}
