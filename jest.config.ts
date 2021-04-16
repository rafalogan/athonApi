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
	roots: ['<rootDir>/src'],
	modulePaths: ['<rootDir>'],
	testEnvironment: 'node',
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

	maxWorkers: '50%',
	watchPathIgnorePatterns: ['node_modules', '<rootDir>/test'],
};
