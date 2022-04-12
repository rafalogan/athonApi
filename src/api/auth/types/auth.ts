import { AuthService } from 'src/services';
import { LogController, ResponseController } from 'src/core/controller';

export interface AuthControllerOptions {
	authService: AuthService;
	responseController: ResponseController;
	logController: LogController;
}
