import { IProfile, IRule, IUser, Profile, Rule } from 'src/core/entities';

export class User implements IUser {
	id: number;
	name: string;
	email: string;
	password?: string;
	profile?: Profile;
	permissions?: Rule[];

	profileId: number;
	deleteAt?: Date;

	constructor(props: IUser, id?: number) {
		this.id = Number(id ? id : props.id);
		this.name = props.name;
		this.email = props.email;
		this.password = props?.password;
		this.profileId = Number(props.profileId);
		this.profile = this._setProfile(props?.profile);
		this.permissions = this._setRules(props?.permissions);
		this.deleteAt = props?.deleteAt;
	}

	private _setProfile(profile: IProfile | undefined): Profile | undefined {
		return profile ? new Profile(profile) : undefined;
	}

	private _setRules(rules: IRule[] | undefined): Rule[] | [] {
		return rules ? rules.map(item => new Rule(item)) : [];
	}
}
