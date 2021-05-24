import { UserService, ProfileService } from 'src/services';
import { ISecurity } from 'src/environment/types/security';
import { LogHandler } from 'src/core/handlers';

export interface IAuthServiceOptions {
	userService: UserService;
	profileService: ProfileService;
	loghandler: LogHandler;
	security: ISecurity;
}
