import dotenv from 'dotenv';

import ProfileEnv from 'src/environment/profile.env';
import { IProfile } from 'src/environment/types/profile';

import MockProfile from '../../database/tests/mocks/mock-profile.json';
import MockProfileConn from '../../database/tests/mocks/mock-profile-conn.json';

dotenv.config({ path: '.env.testing' });

describe('#ProfileEnv', () => {
	test('Should profile in Test environment', () => {
		const result = new ProfileEnv();
		const expected: IProfile = MockProfile;
		expect(result).toEqual(expected);
	});

	test('Should profile in Development Environment', () => {
		process.env = { ...process.env, DB_FILENAME: undefined };

		const result = new ProfileEnv();
		const expected: IProfile = MockProfileConn;

		expect(result).toEqual(expected);
	});
});
