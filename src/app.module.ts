import { Application } from 'express';
import http from 'http';
import https from 'https';

import LogHandler from 'src/core/handlers/log.handler';
import { IHttpsOptions } from 'src/environment/types/https-options';

export default class AppModule {
	express: Application;
	httpsOptions: IHttpsOptions;
	port: number;
	enableHTTPS: boolean;
	baseURL: string;

	constructor(private log: LogHandler, express: Application, options: IHttpsOptions, baseURL: string, port: number, enableHTTPS: boolean) {
		this.express = express;
		this.httpsOptions = options;
		this.port = port;
		this.enableHTTPS = enableHTTPS;
		this.baseURL = baseURL;
	}

	createServer() {
		this.enableHTTPS ? this._createHttpServer() : this._createHttpsServer();
	}

	private _createHttpServer() {
		http.createServer(this.express).listen(this.port).on('listening', this._onServerUp.bind(this)).on('error', this._onServerError.bind(this));
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

	private _onServerError(error: NodeJS.ErrnoException) {
		this.log.error(`ERROR: On Server Inti: ${__filename}`, error);
	}
}
