export class DatabaseException extends Error {
	name = 'DatabaseException';

	constructor(message: string) {
		super(`${message}: in Database`);
	}
}
