import {
	CacheConnectionController,
	LogController,
	LoggerController,
	NoRelationalConnectionController,
	RelationalConnectionController,
	ResponseController,
} from 'src/core/controller';
import { ProfileEnv } from 'src/environment';
import { KnexConfig } from 'src/config';

export default class CoreModule {
	cacheConnectionController: CacheConnectionController;
	logController: LogController;
	loggerController: LoggerController;
	noRelationalConnectionController: NoRelationalConnectionController;
	relationalConnectionController: RelationalConnectionController;
	responseController: ResponseController;

	constructor(options: { profileEnv: ProfileEnv; file: KnexConfig }) {
		this.loggerController = new LoggerController(options.profileEnv.env);
		this.logController = this._instanceLogController(options.profileEnv);
		this.cacheConnectionController = this._instanceCacheController(options.profileEnv);
		this.noRelationalConnectionController = this._instanceNoRelationalConnectionController(options.profileEnv);
		this.relationalConnectionController = this._instanceRelationalConnectionController(options.file);
		this.responseController = new ResponseController(this.logController);
	}

	private _instanceLogController(profileEnv: ProfileEnv) {
		const { env } = profileEnv;
		return new LogController(this.loggerController.logger, env);
	}

	private _instanceCacheController(profileEnv: ProfileEnv) {
		const {
			cache: { client },
		} = profileEnv;
		return new CacheConnectionController(client, this.logController);
	}

	private _instanceNoRelationalConnectionController(param: ProfileEnv) {
		const { noRelationalDatabase } = param;

		return new NoRelationalConnectionController(noRelationalDatabase, this.logController);
	}

	private _instanceRelationalConnectionController(parm: KnexConfig) {
		return new RelationalConnectionController(parm, this.logController);
	}
}
