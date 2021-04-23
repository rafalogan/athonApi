import { Logger, createLogger, LoggerOptions } from 'winston';

export default class LoggerConfig {
	private readonly _logger: Logger;

	constructor(private options: LoggerOptions) {
		this._logger = this.create();
		this._logger.stream({ write: this.write() });
	}

	get logger() {
		return this._logger;
	}
	private create() {
		return createLogger(this.options);
	}

	private write() {
		return (message: string) => this.logger.info(message.trim());
	}
}
