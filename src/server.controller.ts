import http from 'http';
import https, { ServerOptions } from 'https';
import express, { Application } from 'express';

import { Environment } from 'src/config/environment.config';
import { onError, onHttp, TERMINAL_COLORS } from 'src/util';

const { green, reset } = TERMINAL_COLORS;

export class ServerController {
	private server?: https.Server | http.Server;

	constructor(private express: Application, private env: Environment, private httpsOptions: ServerOptions) {}

	exec() {
		return this.env.security.enableHTTPS ? this.createHttpsServer() : this.createHttpServer();
	}

	private createHttpServer() {
		this.server = http
			.createServer(this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	close() {
		this.server?.close();
	}

	private createHttpsServer() {
		this.server = https
			.createServer(this.httpsOptions, this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	private onServerUp() {
		return onHttp('Server is up and running on:', `${green}${this.env.baseUrl}${reset}`);
	}

	private onServerError(error: NodeJS.ErrnoException) {
		return onError(`ERROR: On Server Inti: ${__filename}`, error);
	}

	onServerDown() {
		return onHttp('Server is down.');
	}
}
