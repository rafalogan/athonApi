export default {
	clearMocks: true,
	displayName: 'root-tests',
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
	},
	roots: ['<rootDir>/src', '<rootDir>/test'],
	modulePaths: ['<rootDir>'],
	resolvedModuleNames: {
		'src/(.*)': '<rootDir>/src/$1',
		'test/(.*)': '<rootDir>/test/$1',
	},
	testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	testEnvironment: 'node',
	preset: 'ts-jest',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	coverageThreshold: {
		global: {
			branch: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
	maxWorkers: '50%',
	watchPathIgnorePatterns: ['node_modules'],
};
