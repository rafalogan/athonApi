import dotenv from 'dotenv';

import ProfileEnv from 'src/environment/profile.env';
import HttpsEnv from 'src/environment/https.env';
import { IProfileEnv } from 'src/environment/types/profile';
import { IHttpsOptions } from 'src/environment/types/https-options';

import MockProfile from 'database/tests/mocks/mock-profile.json';
import MockProfileEmpty from 'database/tests/mocks/mock-profile-empty.json';
import MockHttpsOptions from 'database/tests/mocks/mock-http-env.json';

describe('Environments Tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	describe('#ProfileEnv', () => {
		test('Should be return the object with all the default settings', () => {
			process.env.NODE_ENV = '';
			dotenv.config({ path: 'database/tests/mocks/.env.mock' });

			const resultDefault: IProfileEnv = new ProfileEnv();
			const expected: IProfileEnv = MockProfileEmpty;

			expect(resultDefault).toEqual(expected);
		});

		test('Should profile in Test environment', async () => {
			process.env.NODE_ENV = 'test';
			dotenv.config({ path: '.env.testing' });

			const result = new ProfileEnv();
			const expected: IProfileEnv = MockProfile;

			expect(result).toEqual(expected);
		});
	});

	describe('#HTTPSEnv Suit', () => {
		test('Should return an object with https options', () => {
			const mockPath = './database/tests/mocks/mockfile.csr';
			const httpOptions: IHttpsOptions = new HttpsEnv(mockPath, mockPath);
			const expected: IHttpsOptions = MockHttpsOptions;
			expected.version = process.env.npm_package_version;

			expect(httpOptions).toEqual(expected);
		});
	});
});
