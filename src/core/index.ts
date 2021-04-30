import LogHandler from 'src/core/handlers/log.handler';
import NoRelationalConnection from 'src/core/connections/no-relational.connection';
import RelationalConnection from 'src/core/connections/relational.connection';
import CacheConnection from 'src/core/connections/cache.connection';

import { profile } from 'src/environment';
import { LoggerModule } from 'src/core/libs/logger.module';
import { knexConfig } from 'src/config';

const { env, noRelationalDatabase, cache } = profile;

export const logger = LoggerModule.logger;
export const logHandler = new LogHandler(logger, env);
export const noRelationalDB = new NoRelationalConnection(noRelationalDatabase, logHandler);
export const relationalDB = new RelationalConnection(knexConfig, logHandler);
export const cacheDB = new CacheConnection(cache, logHandler);
