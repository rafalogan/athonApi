import { readFileSync } from 'fs';

import { IHttpsOptions } from 'src/environment/types/https-options';

export class HttpsEnv implements IHttpsOptions {
	cert: string;
	key: string;
	name?: string;
	version?: string;
	passphrase: string;

	constructor(certPath: string, keyPath: string, passphrase: string) {
		this.name = process.env.npm_package_name;
		this.version = process.env.npm_package_version;
		this.cert = this.getContent(certPath);
		this.key = this.getContent(keyPath);
		this.passphrase = passphrase;
	}

	getContent(path: string): string {
		return this.fileContent(path);
	}

	private fileContent(path: string): string {
		return readFileSync(path).toString();
	}
}
