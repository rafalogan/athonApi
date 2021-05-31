import http from 'http';
import https from 'https';
import { Application } from 'express';

import { LogController } from 'src/core/controller';
import { HttpsEnv } from 'src/environment';

export default class AppModule {
	baseURL: string;
	server?: http.Server | https.Server;

	constructor(
		private log: LogController,
		private express: Application,
		private httpsOptions: HttpsEnv,
		private port: number,
		private host: string,
		private enableHTTPS: boolean
	) {
		this.baseURL = this._setBaseURL();
	}

	createServer() {
		this.enableHTTPS ? this._createHttpsServer() : this._createHttpServer();
	}

	private _createHttpServer() {
		http
			.createServer(this.express)
			.listen(this.port)
			.on('listening', this._onServerUp.bind(this))
			.on('error', this._onServerError.bind(this));
	}

	private _createHttpsServer() {
		https
			.createServer(this.httpsOptions, this.express)
			.listen(this.port)
			.on('listening', this._onServerUp.bind(this))
			.on('error', this._onServerError.bind(this));
	}

	private _onServerUp() {
		this.log.http(`SERVER ONLINE: ${this.baseURL}`);
	}

	private _setBaseURL() {
		const prefix = this.enableHTTPS ? 'https' : 'http';
		return `${prefix}://${this.host}:${this.port}`;
	}

	private _onServerError(error: NodeJS.ErrnoException) {
		this.log.error(`ERROR: On Server Inti: ${__filename}`, error);
	}
}
