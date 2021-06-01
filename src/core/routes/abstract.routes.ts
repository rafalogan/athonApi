import { Application } from 'express';
import { AuthService } from 'src/services';

export abstract class AbstractRoutes {
	protected app: Application;
	protected auth?: AuthService;

	constructor(app: Application, auth?: AuthService) {
		this.app = app;
		this.auth = auth;
	}
}
