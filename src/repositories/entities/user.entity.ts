import { Profile, ProfileEntity, Rule, RuleEntity, UserEntity } from 'src/repositories/entities/index';

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
		this.profile = this.setProfile(props?.profile);
		this.permissions = this.setRules(props?.permissions);
		this.deleteAt = props?.deleteAt;
	}

	private setProfile(profile: ProfileEntity | undefined): Profile | undefined {
		return profile ? new Profile(profile) : undefined;
	}

	private setRules(rules: Rule[] | RuleEntity[] | undefined): Rule[] | [] {
		return rules ? rules.map(item => new Rule(item)) : [];
	}
}
