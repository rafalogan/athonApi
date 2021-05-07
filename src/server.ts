import './util/module-alias';

import { HttpsEnv, ProfileEnv } from 'src/environment';
import { LoggerComponent } from 'src/core/libs';
import { LogHandler } from 'src/core/handlers';

import CoreModule from 'src/core/core.module';
import AppModule from 'src/app.module';

import { execDotenv } from 'src/util/validate';

execDotenv();

const profile = new ProfileEnv();
const { security, port, host } = profile;
const httpsOptions = new HttpsEnv(security.cert, security.key, security.passphrase);

const logger = new LoggerComponent(profile.env).logger;
const logHandler = new LogHandler(logger, profile.env);

const coreModule = new CoreModule(profile.env, logger);
const appModule = new AppModule(logHandler, coreModule.express, httpsOptions, port, host, security.enableHTTPS);

(async () => appModule.createServer())();
