import isEmpty from 'is-empty';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { ICredentials } from 'src/modules/auth/types/auth';
import { User } from 'src/core/domains';

export const existsOrError = (value: any, message: string) => {
	if (isEmpty(value)) throw message;
	if (!value) throw message;
	if (Array.isArray(value) && value.length === 0) throw message;
	if (typeof value === 'string' && !value.trim()) throw message;
	if (typeof value === 'number' && !Number(value)) throw message;
};

export const notExistisOrError = (value: any, message: string) => {
	try {
		existsOrError(value, message);
	} catch (message) {
		return;
	}

	throw message;
};

export const equalsOrError = (valueA: any, valueB: any, message: string) => {
	if (valueA !== valueB) throw message;
};

export const execDotenv = () => {
	const isEnvValid = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

	if (isEnvValid) return dotenv.config({ path: process.env.NODE_ENV === 'test' ? './.emv.testing' : './.env' });

	return;
};

export const isMatch = (credentials: ICredentials, user: User) => bcrypt.compareSync(credentials.password, user.password);
