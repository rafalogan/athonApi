import { resolve } from 'path';

import jestConfig from '../jest.config';

const rootDir = resolve(__dirname, '..');

export default {
	...jestConfig,
	rootDir,
	roots: ['<rootDir>/test/e2e'],
	setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
	displayName: 'end2end-tests',
	testMatch: ['<rootDir>/test/**/?(*.)+(spec|test).[tj]s?(x)'],
};
