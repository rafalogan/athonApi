import { IPayload } from 'src/core/entities/types/payload';
import { IProfile } from 'src/core/entities/types/profile';

export class Payload implements IPayload {
	id: number;
	name: string;
	email: string;
	profile: IProfile;
	iat: number;
	exp: number;

	constructor(data: IPayload) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.profile = data.profile;
		this.iat = data.iat ? data.iat : this._now();
		this.exp = data.exp ? data.exp : this._expires();
	}

	private _now() {
		return Math.floor(Date.now() / 1000);
	}

	private _expires() {
		return this.iat + 60 * 60 * 24;
	}
}
