import { IProfile, IRule, Rule } from 'src/repositories/entities/index';

export class Profile implements IProfile {
	id: number;
	title: string;
	description: string;
	permissions?: Rule[];
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IProfile, id?: number) {
		this.id = Number(id ? id : props.id);
		this.title = props.title;
		this.description = props.description;
		this.permissions = this._setPermissions(props?.permissions);
		this.createdAt = props?.createdAt;
		this.updatedAt = props?.updatedAt;
	}

	private _setPermissions(rules: IRule[] | undefined): Rule[] | [] {
		return rules ? rules.map(item => new Rule(item)) : [];
	}
}
