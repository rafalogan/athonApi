import { ServerOptions } from 'https';

import { execDotenv } from 'src/util';
import { Environment } from 'src/config/environment.config';
import { AppConfig } from 'src/config/app.config';
import { LoggerConfig } from 'src/config/logger.config';
import { ServerController } from 'src/server.controller';
import { HttpsOptions } from 'src/config/https-options.config';

execDotenv();

export const env = new Environment();

export const logger = new LoggerConfig(env.nodeEnv).logger;
const app = new AppConfig(env.nodeEnv, logger).express;
const httpsOptions: ServerOptions = new HttpsOptions(env.security);

export const server = new ServerController(app, env, httpsOptions);
