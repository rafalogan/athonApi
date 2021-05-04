import passport from 'passport';
import { Application } from 'express';

export abstract class AbistractRoutes {
	protected app: Application;
	protected auth?: passport.Authenticator;

	constructor(app: Application, auth?: passport.Authenticator) {
		this.app = app;
		this.auth = auth;
	}
}
