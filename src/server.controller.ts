import http from 'http';
import https, { ServerOptions } from 'https';
import { Application } from 'express';
import { Environment } from 'src/config/environment.config';
import { onError, onHttp, onLog } from 'src/util';

export class ServerController {
	constructor(private express: Application, private env: Environment, private httpsOptions: ServerOptions) {}

	exec() {
		return this.env.security.enableHTTPS ? this.createHttpsServer() : this.createHttpServer();
	}

	private createHttpServer() {
		http
			.createServer(this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	private createHttpsServer() {
		https
			.createServer(this.httpsOptions, this.express)
			.listen(this.env.port)
			.on('listening', this.onServerUp.bind(this))
			.on('error', this.onServerError.bind(this));
	}

	private onServerUp() {
		return onHttp('Server is up and running on:', this.env.baseUrl);
	}

	private onServerError(error: NodeJS.ErrnoException) {
		return onError(`ERROR: On Server Inti: ${__filename}`, error);
	}
}
