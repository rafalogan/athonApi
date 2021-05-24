import { User, Profile, Rule, IPayload } from 'src/core/entities';

export class Payload implements IPayload {
	id: number;
	name: string;
	email: string;
	profile?: Profile;
	permissions?: Rule[];
	iat: number;
	exp: number;

	constructor(data: User | IPayload) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.profile = data.profile;
		this.permissions = data.permissions;
		this.iat = !(data instanceof User) && data.iat ? data.iat : this._now();
		this.exp = !(data instanceof User) && data.exp ? data.exp : this._expires();
	}

	private _now() {
		return Math.floor(Date.now() / 1000);
	}

	private _expires() {
		return this.iat + 60 * 60 * 24;
	}
}
