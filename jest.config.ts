export default {
	clearMocks: true,
	displayName: 'root-tests',
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	preset: 'ts-jest',
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
		'test/(.*)': '<rootDir>/test/$1',
	},
	// roots: ['<rootDir>/src'],
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
	testEnvironment: 'node',
	watchPathIgnorePatterns: ['node_modules', '<rootDir>/test'],
};
