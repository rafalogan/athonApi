require('ts-node/register');
require('tsconfig-paths/register');

import type { Knex } from 'knex';

import { env } from 'src/server';
import { KnexFileConfig } from 'src/config/knexfile.config';

const { databaseEnv } = env;
const config: Knex.Config = new KnexFileConfig(databaseEnv);

module.exports = config;
