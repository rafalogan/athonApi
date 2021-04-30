import KnexConfig from 'src/config/knex.config';
import { profile } from 'src/environment';

const { relationalDatabase, timezone } = profile;

export const knexConfig = new KnexConfig(relationalDatabase, timezone);
export * from 'src/config/logger.config';
