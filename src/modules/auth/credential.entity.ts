import { ICredentials } from 'src/modules/auth/types/auth';

export class Credential implements ICredentials {
	email: string;
	password: string;

	constructor(form: ICredentials) {
		this.email = form.email;
		this.password = form.password;
	}
}
