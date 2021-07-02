import './util/module-alias';

import { HttpsEnv, ProfileEnv } from 'src/environment';
import CoreModule from 'src/core/core.module';
import AppModule from 'src/app.module';

import { convertDataValues, execDotenv } from 'src/util';
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

const test: any = {
	name: 'My Name',
	email: 'e mail',
	userId: 10,
	profileId: 5,
	ruleId: 3,
	fullName: 'test to convert object',
	createdAt: new Date(),
	updatedAt: new Date(),
};

console.log('convert object', convertDataValues(test));

(async () => {
	const NRConnection = await coreModule.noRelationalConnectionController.connect();
	const RConnection = await coreModule.relationalConnectionController.isConnected();

	if (NRConnection && RConnection) return coreModule.relationalConnectionController.latest()
		.then(())
})();
