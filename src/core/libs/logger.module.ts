import winston, { addColors, LoggerOptions } from 'winston';

import { profile } from 'src/environment';
import LoggerConfig from 'src/config/logger.config';

const { env } = profile;

const isDevelopment = env === 'development';
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};
const level = (): string => (isDevelopment ? 'debug' : 'info');

const colors = {
	error: 'red',
	warn: 'yellow',
	info: isDevelopment ? 'cyan' : 'green',
	http: 'magenta',
	debug: 'white',
};

const timestamp = winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
const colorize = winston.format.colorize({ all: true });
const print = winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);
const format = winston.format.combine(timestamp, colorize, print);
const transports = [new winston.transports.Console({ level: 'debug', format }), new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/all.log' })];

const loggerOptions: LoggerOptions = {
	level: level(),
	levels,
	format,
	transports,
};
addColors(colors);

export const LoggerModule = new LoggerConfig(loggerOptions);
