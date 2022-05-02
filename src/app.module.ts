import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { ServerController } from 'src/server.controller';
import { onError } from 'src/util';
import http from 'http';
import https from 'https';

export class AppModule {
	constructor(
		private connectionController: ConnectionController,
		private cacheConnectionController: CacheConnectionController,
		private serverController: ServerController
	) {}

	init() {
		return this.connectionController
			.isConnected()
			.then(() => this.connectionController.latest())
			.then(() => this.cacheConnectionController.isConnect())
			.then(() => this.serverController.exec())
			.catch(error => onError('Erro ao iniciar o servidor', error));
	}

	close() {
		return this.serverController.close();
	}

	clearDatabase() {
		return this.connectionController.rollback();
	}
}
