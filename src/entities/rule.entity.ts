import { IRule } from 'src/entities/types/rule';

export class Rule implements IRule {
	id: number;
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IRule, id?: number) {
		this.id = Number(id ? id : props.id);
		this.name = props.name;
		this.description = props.description;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
