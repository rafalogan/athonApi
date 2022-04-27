import { ServerOptions } from 'https';

import { execDotenv } from 'src/util';
import { Environment } from 'src/config/environment.config';
import { AppConfig } from 'src/config/app.config';
import { LoggerConfig } from 'src/config/logger.config';
import { ServerController } from 'src/server.controller';
import { HttpsOptions } from 'src/config/https-options.config';
import { AppModule } from 'src/app.module';
import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { KnexFileConfig } from 'src/config/knexfile.config';
import { ServicesModule } from 'src/services';
import { AuthConfig } from 'src/config/auth.config';
import { MulterConfig } from 'src/config/multer.config';

execDotenv();

export const env = new Environment();

export const logger = new LoggerConfig(env.nodeEnv).logger;
const httpsOptions: ServerOptions = new HttpsOptions(env.security);
const keyfile = new KnexFileConfig(env.databaseEnv);
const dbConnection = new ConnectionController(keyfile);
const cacheConnection = new CacheConnectionController(env.cacheEnv);
const services = new ServicesModule(dbConnection, cacheConnection, env);
const authConfig = new AuthConfig(env.security.authSecret, services.userService);
const multerConfig = new MulterConfig(env.awsConfig);

const app = new AppConfig(env.nodeEnv, logger, authConfig, services, multerConfig).express;
export const server = new ServerController(app, env, httpsOptions);
export const appModule = new AppModule(dbConnection, cacheConnection, server);
