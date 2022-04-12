import { ServerOptions } from 'https';

import { execDotenv, onDebug, onError, onLog, onWarn } from 'src/util';
import { Environment } from 'src/config/environment.config';
import { AppConfig } from 'src/config/app.config';
import { LoggerConfig } from 'src/config/logger.config';
import { ServerController } from 'src/server.controller';
import { HttpsOptions } from 'src/config/https-options.config';
import { AppModule } from 'src/app.module';
import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { KnexFileConfig } from 'src/config/knexfile.config';
import { ControllersModule } from 'src/controllers/controllers.module';
import { ServicesModule } from 'src/services';

execDotenv();

export const env = new Environment();

export const logger = new LoggerConfig(env.nodeEnv).logger;
const httpsOptions: ServerOptions = new HttpsOptions(env.security);
const knexfile = new KnexFileConfig(env.databaseEnv);
const dbConnection = new ConnectionController(knexfile);
const cacheConnection = new CacheConnectionController(env.cacheEnv);
const services = new ServicesModule(dbConnection, cacheConnection, env);

const app = new AppConfig(env.nodeEnv, logger, services).express;
export const server = new ServerController(app, env, httpsOptions);
export const appModule = new AppModule(dbConnection, cacheConnection, server);
