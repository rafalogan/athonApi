import { createLogger, Logger, LoggerOptions } from 'winston';

export default class LoggerConfig {
	logger: Logger;

	constructor(private options?: LoggerOptions) {
		this.logger = this.create(this.options);
		this.logger.stream({ write: this.write() });
	}

	private write() {
		return (message: string) => this.logger.info(message?.trim());
	}
	protected create(options?: LoggerOptions): Logger {
		return createLogger(options);
	}
}
