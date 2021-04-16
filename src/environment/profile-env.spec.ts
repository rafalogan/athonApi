import ProfileEnv from 'src/environment/profile.env';
import { IProfile } from 'src/environment/types/profile';
import MockProfile from '../../database/tests/mocks/mock-profile.json';

describe('#ProfileEnv', () => {
	test('Should test profile', () => {
		const profile = new ProfileEnv();
		const expected: IProfile = MockProfile;

		expect(profile).toEqual(expected);
	});
});
