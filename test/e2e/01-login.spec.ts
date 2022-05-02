import request from 'supertest';
import { env } from '../../src/server';

describe('Teste all endpoints of login', () => {
	it('Should signing route', async () => {
		const response = await request(env.baseUrl).post('/signing').send({});
		const expected = {
			status: 401,
			message: 'Login Unauthorized! Verify your e-mail and password!',
		};

		expect(response.status).toBe(401);
		expect(response.body).toEqual(expected);
	});
});
