import { ISecurity } from 'src/config/types/security';

export default class SecurityConfig implements ISecurity {
	saltRounds: number;
	enableHttps: boolean;
	certificate: any;
	key:any
	authSecret: string;

	constructor() {
		this.saltRounds = Number(process.env.SALT_ROUNDS) || 10;
		this.enableHttps = this._enableHttps();
		this.certificate = process.env.CERT || '';
		this.key = process.env.KEY || '';
		this.authSecret = process.env.AUTHSECRET || '@Athon$API#';
	}

	private _enableHttps() {
		return (process.env.ENABLE_HTTPS === 'true');
	}

}
