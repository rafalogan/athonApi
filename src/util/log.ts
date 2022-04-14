import { logger } from 'src/server';
import { stringify } from 'src/util/convert';

const noProd = process.env.NODE_ENV !== 'production';
const isDebug = process.env.DEBUG === 'true';

export const terminalColors = {
	reset: '\x1b[0m',

	black: '\x1b[30m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	magenta: '\x1b[35m',
	white: '\x1b[37m',

	blackBg: '\x1b[40m',
	redBg: '\x1b[41m',
	greenBg: '\x1b[42m',
	yellowBg: '\x1b[43m',
	ylueBg: '\x1b[44m',
	magentaBg: '\x1b[45m',
	cyanBg: '\x1b[46m',
	whiteBg: '\x1b[47m',
};

export const onLog = (...args: any[]) => {
	if (noProd)
		return console.log(
			`${terminalColors.cyanBg + terminalColors.black}[Log:]${terminalColors.reset}`,
			`${terminalColors.cyan} ${args[0]}${terminalColors.reset}`,
			...args.slice(1)
		);
	if (isDebug) return logger.log('log', `${args[0]}`, ...args.slice(1));
};

export const onError = (...args: any[]) =>
	noProd
		? console.error(
				`${terminalColors.redBg + terminalColors.black}[Error:]${terminalColors.reset}`,
				`${terminalColors.red}${args[0]}${terminalColors.reset}`,
				...args.slice(1)
		  )
		: logger.error(`${args[0]}`, ...args.slice(1));

export const onWarn = (...args: any[]) =>
	noProd
		? console.warn(
				`${terminalColors.yellowBg + terminalColors.black}[Warn:]${terminalColors.reset}`,
				`${terminalColors.yellow}${args[0]}${terminalColors.reset}`,
				...args.slice(1)
		  )
		: logger.warn(`${args[0]}`, ...args.slice(1));

export const onInfo = (...args: any[]) => logger.info(`${args[0]}`, ...args.slice(1));

export const onDebug = (...args: any[]) => {
	if (isDebug) return logger.debug(`${args[0]}`, ...args.slice(1));
	if (noProd) return console.log(`${terminalColors.whiteBg + terminalColors.black}[Debug:]${terminalColors.reset}`, ...args);
};

export const onHttp = (...args: any[]) => logger.http(stringify(...args));
