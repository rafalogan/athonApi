import { IEnv } from 'src/config/types/env';
import { ISecurity } from 'src/config/types/security';

export default class EnvConfig implements IEnv {
	env: string;
	port: number;
	host: string;
	baseURL: string;

	constructor(private securityConfig: ISecurity) {
		this.env = process.env.NODE_ENV || 'development';
		this.port = Number(process.env.PORT) || 9000;
		this.host = process.env.HOST || 'localhost';
		this.baseURL = this._setBaseURL();
	}

	private _setBaseURL() {
		const prefix = (this.securityConfig.enableHttps) ? 'https://' : 'http://';
		return `${prefix}${this.host}:${this.port}`;
	}
}
