import fs from 'fs';

import SecurityConfig from 'src/config/security.config';

export default class HttpsConfig {
	name = process.env.npm_package_name || '';
	version = process.env.npm_package_version || '';
	cert: string;
	key: string;

	constructor(private security: SecurityConfig) {
		this.cert = this._loadFile(security.certificate);
		this.key = this._loadFile(security.key);
	}

	private _loadFile(path): string {
		return fs.readFileSync(path).toString()
	}
}
