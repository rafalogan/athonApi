import { Profile, ProfileEntity, Rule, RuleEntity, UserEntity } from 'src/entities';

export class User implements UserEntity {
	id: number;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	profile?: Profile;
	permissions?: Rule[];

	profileId: number;
	deleteAt?: Date;

	constructor(props: UserEntity, id?: number) {
		this.id = Number(id ? id : props.id);
		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.confirmPassword = props?.confirmPassword;
		this.profileId = Number(props.profileId);
		this.profile = this._setProfile(props?.profile);
		this.permissions = this._setRules(props?.permissions);
		this.deleteAt = props?.deleteAt;
	}

	private _setProfile(profile: ProfileEntity | undefined): Profile | undefined {
		return profile ? new Profile(profile) : undefined;
	}

	private _setRules(rules: Rule[] | RuleEntity[] | undefined): Rule[] | [] {
		return rules ? rules.map(item => new Rule(item)) : [];
	}
}
