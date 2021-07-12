import { AppController } from 'src/app.controller';
import { ServerController } from 'src/server.controller';
import ServicesModule from 'src/services/services.module';
import CoreModule from 'src/core/core.module';
import { HttpsEnv, ProfileEnv } from 'src/environment';

export default class AppModule {
	private appController: AppController;
	private serverController: ServerController;

	constructor(private profileEnv: ProfileEnv, private coreModule: CoreModule, servicesModule: ServicesModule, httpsEnv: HttpsEnv) {
		this.appController = new AppController(this.coreModule, this.profileEnv, servicesModule);
		this.serverController = this._insttaceServer(httpsEnv);
	}

	init() {
		return this.coreModule.relationalConnectionController
			.isConnected()
			.then(async () => await this.coreModule.relationalConnectionController.latest())
			.then(() => this.coreModule.noRelationalConnectionController.connect())
			.then(() => this.coreModule.cacheConnectionController.connection)
			.then(() => this.serverController.createServer());
	}

	private _insttaceServer(httpsOptions: HttpsEnv) {
		const {
			port,
			host,
			security: { enableHTTPS },
		} = this.profileEnv;
		const { logController } = this.coreModule;
		const express = this.appController.express;

		return new ServerController(logController, httpsOptions, express, port, host, enableHTTPS);
	}
}
