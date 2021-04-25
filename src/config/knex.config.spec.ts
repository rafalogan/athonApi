import KnexConfig from 'src/config/knex.config';

import MockProfile from 'database/tests/mocks/mock-profile.json';
import MockKnexFile from 'database/tests/mocks/mock-knex-file.json';

describe('#KenexConfig Suite', () => {
	beforeEach(() => jest.clearAllMocks());

	test('Should to return the object needed to configure Knex', () => {
		const { relationalDatabase, timezone } = MockProfile;
		const knexConfig = new KnexConfig(relationalDatabase, timezone);
		const expected = MockKnexFile;

		const result = knexConfig.getFile();

		expect(result).toStrictEqual(expected);
	});
});
