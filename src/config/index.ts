import { format, LoggerOptions, transports } from 'winston';

import KnexConfig from 'src/config/knex.config';
import { profile } from 'src/environment';
import LoggerConfig from 'src/config/logger.config';

const { relationalDatabase, timezone } = profile;

const loggerOptions: LoggerOptions = {
	level: 'info',
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new transports.Console({
			level: 'debug',
			format: format.combine(
				format.colorize(),
				format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
			),
		}),
	],
};

export const knexConfig = new KnexConfig(relationalDatabase, timezone);
export const logger = new LoggerConfig(loggerOptions).logger;
