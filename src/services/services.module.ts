import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { Environment } from 'src/config/environment.config';
import { UserService } from 'src/services/user.service';

export class ServicesModule {
	userService: UserService;
	constructor(private databaseConn: ConnectionController, private cacheConn: CacheConnectionController, private env: Environment) {}
}
