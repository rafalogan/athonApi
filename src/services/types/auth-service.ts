import { LogController } from 'src/core/controller';
import { UserService } from 'src/services';
import { SecurityOptions } from 'src/environment';

export interface AuthServiceOptions {
	userService: UserService;
	log: LogController;
	security: SecurityOptions;
}
