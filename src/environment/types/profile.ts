import { INoRelationalDatabase } from 'src/environment/types/no-relational-database';
import { IRelationalDatabase } from 'src/environment/types/relational-database';
import { ISecurity } from 'src/environment/types/security';
import { ICache } from 'src/environment/types/cache';

export interface IProfileEnv extends IServer {
	env: string;
	timezone: string;
	relationalDatabase: IRelationalDatabase;
	noRelationalDatabase: INoRelationalDatabase;
	cache: ICache;
	security: ISecurity;
}

export interface IServer {
	host: string;
	port: number;
}
