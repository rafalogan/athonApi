import '../src/util/module-alias';
import * as jestCli from 'jest-cli';

import { appModule } from 'src/server';

class JestStartup {
	constructor() {
		this.beforeAllTests()
			.then(() => jestCli.run(['--no-cache', '--runInBand', '--config ./test/jest.config.js', '--coverage']))
			.then(() => this.afterAllTests())
			.catch(console.error);
	}

	beforeAllTests() {
		return appModule.init();
	}

	afterAllTests() {
		return appModule.clearDatabase().then(() => process.exit());
	}
}

(() => new JestStartup())();
