import { logger } from 'src/server';
import { stringfy } from 'src/util/convert';

const noProd = process.env.NODE_ENV !== 'production';
const isDebug = process.env.DEBUG === 'true';

export const onLog = (...args: any[]) => {
	if (noProd) return console.log('[Log:]', ...args);
	if (isDebug) return logger.log('log', `${args[0]}`, ...args.slice(1));
};

export const onError = (...args: any[]) => (noProd ? console.error('[Error:]', ...args) : logger.error(`${args[0]}`, ...args.slice(1)));

export const onWarn = (...args: any[]) => (noProd ? console.warn('[Warn:]', ...args) : logger.warn(`${args[0]}`, ...args.slice(1)));

export const onInfo = (...args: any[]) => logger.info(`${args[0]}`, ...args.slice(1));

export const onDebug = (...args: any[]) => (isDebug ? logger.debug(`${args[0]}`, ...args.slice(1)) : console.log('[Debug:] ', ...args));

export const onHttp = (...args: any[]) => logger.http(stringfy(...args));
