import { Logger } from 'winston';
import { ProfileEnv } from 'src/environment';
import AuthModule from 'src/api/auth/auth.module';

export interface AppControllerOptions {
	logger: Logger;
	profile: ProfileEnv;
	authModule: AuthModule;
}
