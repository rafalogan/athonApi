import { IRelationalDatabase } from 'src/environment/types/relational-database';

export interface IKnexFile extends IRelationalDatabase {
	version?: string;
	pool: IPool;
	migration: IMigration;
	timezone: string;
}

export interface IPool {
	min: number;
	max: number;
	idle?: number;
}

export interface IMigration {
	tableName: string;
	directory: string;
	extension: string;
}
