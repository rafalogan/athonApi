import LogHandler from 'src/core/handlers/log.handler';
import NoRelationalConnectionComponent from 'src/core/connections/no-relational-connection.component';
import RelationalConnectionComponent from 'src/core/connections/relational-connection.component';
import CacheConnectionComponent from 'src/core/connections/cache-connection.component';

import { profile } from 'src/environment';
import { LoggerModule } from 'src/core/libs/logger.module';
import { knexConfig } from 'src/config';

const { env, noRelationalDatabase, cache } = profile;

export const logger = LoggerModule.logger;
export const logHandler = new LogHandler(logger, env);
export const connNoRelationalDB = new NoRelationalConnectionComponent(noRelationalDatabase, logHandler);
export const conRelationalDB = new RelationalConnectionComponent(knexConfig, logHandler);
export const connCacheDB = new CacheConnectionComponent(cache, logHandler);
