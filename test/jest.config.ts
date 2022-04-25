import { resolve } from 'path';

import jestConfig from '../jest.config';

const rootDir = resolve(__dirname, '..');

export default {
	...jestConfig,
	rootDir,
	roots: ['<rootDir>/test'],
	displayName: 'end2end-tests',
	setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
	testMatch: ['<rootDir>/test/**/?(*.)+(spec|test).[tj]s?(x)'],
};
