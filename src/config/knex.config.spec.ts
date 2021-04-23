import KnexConfig from 'src/config/knex.config';
import MockProfile from 'database/tests/mocks/mock-profile.json';
import MockKnexFile from 'database/tests/mocks/mock-knex-file.json';
import { IProfile } from 'src/environment/types/profile';

describe('#KenexConfig Suite', () => {
	let profile: IProfile;

	beforeEach(() => {
		profile = MockProfile;

		jest.clearAllMocks();
	});

	test('Should to return the object needed to configure Knex', () => {
		const knexConfig = new KnexConfig(profile);
		const expected = MockKnexFile;

		const result = knexConfig.getFile();

		expect(result).toStrictEqual(expected);
	});
});
