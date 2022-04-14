import { LoginService } from 'src/services';
import { LogController, ResponseController } from 'src/core/controller';

export interface AuthControllerOptions {
	authService: LoginService;
	responseController: ResponseController;
	logController: LogController;
}
