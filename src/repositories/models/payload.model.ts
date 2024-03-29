import { Profile, Rule, User } from 'src/repositories/entities';
import { PayloadDomain } from 'src/repositories/types';

export class Payload implements PayloadDomain {
	id: number;
	name: string;
	email: string;
	profile?: Profile;
	permissions?: Rule[];
	iat: number;
	exp: number;

	constructor(data: User | PayloadDomain) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.profile = data.profile;
		this.permissions = data.permissions;
		this.iat = !(data instanceof User) && data.iat ? data.iat : this.now();
		this.exp = !(data instanceof User) && data.exp ? data.exp : this.expires();
	}

	private now() {
		return Math.floor(Date.now() / 1000);
	}

	private expires() {
		return this.iat + 60 * 60 * 24;
	}
}
