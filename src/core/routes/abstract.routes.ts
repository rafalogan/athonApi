import { Application } from 'express';

import { IAuthConfig } from 'src/repositories/types';

export abstract class AbstractRoutes {
	protected app: Application;
	protected auth?: IAuthConfig;

	protected constructor(app: Application, auth?: IAuthConfig) {
		this.app = app;
		this.auth = auth;
	}

	abstract exec(): void;
}
