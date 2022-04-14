import { Logger } from 'winston';
import { ProfileEnv } from 'src/environment';
import AuthModule from 'src/api/login/login.module';

export interface AppControllerOptions {
	logger: Logger;
	profile: ProfileEnv;
	authModule: AuthModule;
}
