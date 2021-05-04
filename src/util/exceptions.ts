export class DatabaseException extends Error {
	name = 'DatabaseException';

	constructor(message: string) {
		super(`${message}: in Database`);
	}
}

export class ResponseException extends Error {
	name = 'ResponseException';

	constructor(message: string) {
		super(`${message}: in Response`);
	}
}
