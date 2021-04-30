import { Logger } from 'winston';

export default class LogHandler {
	env: string;
	isDebug: boolean;

	constructor(private logger: Logger, env: string) {
		this.env = env;
		this.isDebug = this.env === 'development' || this.env === 'homologation' || this.env === 'test';
	}

	error(msg: string, ...data: any[]): void {
		this.logger.error(`ERROR: ${msg}`, ...data);

		if (this.isDebug) console.error(`ERROR: ${msg}`, data);
	}

	warn(msg: string, ...optionalParams: any[]) {
		this.logger.warn(`WARN: ${msg}`, ...optionalParams);
		if (this.isDebug) console.warn(`WARN: ${msg}`, ...optionalParams);
	}

	info(msg: string, ...data: any[]) {
		this.logger.info(`INFO: ${msg}`, ...data);
	}

	http(msg: string, ...data: any[]) {
		this.logger.http(`HTTP: ${msg}`, ...data);
	}

	debug(msg: string, options: any) {
		if (this.isDebug || options?.acttive) this.logger.debug(`DEBUG: ${msg}`, ...options?.data);
		if (this.isDebug) console.log(`DEBUG: ${msg}`, options?.data);
	}
}
