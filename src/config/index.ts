import KnexConfig from 'src/config/knex.config';
import { profile } from 'src/environment';
import { IKnexFile } from 'src/config/types/knex-file';

export const knexConfig = new KnexConfig(profile);

export const knexFileConfig: IKnexFile = {
	client: knexConfig.client,
	version: knexConfig.version,
	connection: knexConfig.connection,
	migration: knexConfig.migration,
	pool: knexConfig.pool,
	timezone: knexConfig.timezone,
};
