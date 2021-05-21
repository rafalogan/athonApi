import { UserService, ProfileService } from 'src/services';
import { ISecurity } from 'src/environment/types/security';

export interface IAuthServiceOptions {
	userService: UserService;
	profileService: ProfileService;
	security: ISecurity;
}
