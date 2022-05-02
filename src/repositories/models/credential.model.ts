import { CredentialsDomain } from 'src/repositories/types';

export class Credential implements CredentialsDomain {
	email: string;
	password: string;

	constructor(form: CredentialsDomain) {
		this.email = form.email;
		this.password = form.password;
	}
}
