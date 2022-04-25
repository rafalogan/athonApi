import { readFileSync } from 'fs';

import { ISecurityEnvironment } from 'src/repositories/types';
import { ServerOptions } from 'https';

export class HttpsOptions implements ServerOptions {
	public key?: string | Buffer | Array<string | Buffer>;
	public cert?: string | Buffer | Array<string | Buffer>;

	constructor(ssl: ISecurityEnvironment) {
		this.key = ssl.enableHTTPS ? readFileSync(ssl.keyFile) : '';
		this.cert = ssl.enableHTTPS ? readFileSync(ssl.certFile) : '';
	}
}
