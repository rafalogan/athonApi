import './util/module-alias';

import { HttpsEnv, ProfileEnv } from 'src/environment';
import CoreModule from 'src/core/core.module';
import AppModule from 'src/app.module';

import { execDotenv } from 'src/util/validate';
import { KnexConfig } from 'src/config';
import ServicesModule from 'src/services/services.module';
import { AppController } from 'src/app.controller';

execDotenv();

const profile = new ProfileEnv();
const { security, port, host, relationalDatabase } = profile;

const knexFile = new KnexConfig(relationalDatabase, profile.timezone);
const httpsOptions = new HttpsEnv(security.cert, security.key, security.passphrase);
const coreModule = new CoreModule({ profileEnv: profile, file: knexFile });

const { logController, relationalConnectionController, cacheConnectionController } = coreModule;
const servicesModule = new ServicesModule(relationalConnectionController, cacheConnectionController, logController, profile);

const appController = new AppController(coreModule, profile, servicesModule);
const appModule = new AppModule(logController, appController.express, httpsOptions, port, host, security.enableHTTPS);

(async () => appModule.createServer())();
