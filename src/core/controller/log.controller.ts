import { Logger } from 'winston';

export class LogController {
	env: string;
	isDebug: boolean;

	constructor(private logger: Logger, env: string) {
		this.env = env;
		this.isDebug = this.env === 'development' || this.env === 'homologation' || this.env === 'test';
	}

	error(msg: string, ...data: any[]): void {
		this.logger.error(`${msg}: ${data}`);

		if (this.isDebug) console.error(`ERROR: ${msg}`, data);
	}

	warn(msg: string, ...optionalParams: any[]) {
		this.logger.warn(`${msg}: ${optionalParams} `);
		if (this.isDebug) console.warn(`WARN: ${msg}`, ...optionalParams);
	}

	info(msg: string, ...data: any[]) {
		this.logger.info(`${msg} ${data}`);
	}

	http(msg: string, ...data: any[]) {
		this.logger.http(`${msg} ${data}`);
	}

	debug(msg: string, options: any) {
		if (this.isDebug || options?.acttive) this.logger.debug(`${msg} ${options}`);
		if (this.isDebug) console.log(`DEBUG: ${msg}`, options?.data);
	}
}
