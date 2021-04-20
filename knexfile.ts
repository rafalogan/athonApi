require('ts-node/register');
require('tsconfig-paths/register');

import { knexConfig } from 'src/config';

module.exports = knexConfig.getFile();
