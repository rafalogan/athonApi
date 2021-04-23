import { format, LoggerOptions, transports } from 'winston';

import LoggerConfig from 'src/config/logger.config';

const MockLoggerOptions: LoggerOptions = {
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

describe('#LoggerConfig Suit', () => {
	beforeEach(() => jest.clearAllMocks());

	test('Should return settings to an information log', async () => {
		const loggerTest = new LoggerConfig(MockLoggerOptions);
		expect(loggerTest.logger).toBeDefined();
	});
});
