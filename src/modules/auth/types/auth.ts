import { AuthService, UserService } from 'src/services';
import { LogHandler, ResponseHandler } from 'src/core/handlers';

export interface IAuthControllerOptions {
	authService: AuthService;
	userService: UserService;
	responseHandler: ResponseHandler;
	logHandler: LogHandler;
}

export interface ICredentials {
	email: string;
	password: string;
}
