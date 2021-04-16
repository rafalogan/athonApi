import { IServer } from 'src/environment/types/profile';
import { IDatabase } from 'src/environment/types/relational-database';

export interface INoRelationalDatabase extends IServer, IDatabase {
	prefix: string;
}
