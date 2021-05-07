import { Logger, createLogger, LoggerOptions } from 'winston';

export class LoggerConfig {
	private readonly _logger: Logger;

	constructor(private options: LoggerOptions) {
		this._logger = this.create();
		// this._logger.stream({ write: (message: string) => this.logger.info(message.trim()) });
	}

	get logger() {
		return this._logger;
	}
	private create() {
		return createLogger(this.options);
	}
}
