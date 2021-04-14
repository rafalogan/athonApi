import { ISecurity } from 'src/config/types/security';

export default class SecurityConfig implements ISecurity {
	saltRounds = Number(process.env.SALT_ROUNDS) || 10;
	certificate = process.env.CERT || '';
	key = process.env.KEY || '';
	authSecret = process.env.AUTHSECRET || '@Athon$API#';
	enableHttps: boolean;

	constructor() {
		this.enableHttps = this._enableHttps();
	}

	private _enableHttps() {
		return process.env.ENABLE_HTTPS === 'true';
	}
}
