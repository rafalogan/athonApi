require('ts-node/register');
require('tsconfig-paths/register');

import { execDotenv } from 'src/util/validate';
import { ProfileEnv } from 'src/environment';
import { KnexConfig } from 'src/config';

execDotenv();

const profile = new ProfileEnv();

module.exports = new KnexConfig(profile.relationalDatabase, profile.timezone);
