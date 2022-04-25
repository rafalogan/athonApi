import { Rule } from 'src/repositories/entities';
import { ProfileEntity, RuleEntity } from 'src/repositories/types';

export class Profile implements ProfileEntity {
	id: number;
	title: string;
	description: string;
	permissions?: Rule[];
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: ProfileEntity, id?: number) {
		this.id = Number(id ? id : props.id);
		this.title = props.title;
		this.description = props.description;
		this.permissions = this.setPermissions(props?.permissions);
		this.createdAt = props?.createdAt;
		this.updatedAt = props?.updatedAt;
	}

	private setPermissions(rules: RuleEntity[] | undefined): Rule[] | [] {
		return rules ? rules.map(item => new Rule(item)) : [];
	}
}
