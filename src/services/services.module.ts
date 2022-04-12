import { CacheConnectionController, ConnectionController } from 'src/core/controller';
import { Environment } from 'src/config/environment.config';

export class ServicesModule {
	constructor(private databaseConn: ConnectionController, private cacheConn: CacheConnectionController, private env: Environment) {}
}
