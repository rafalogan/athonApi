import { IRule } from 'src/core/entities/types/rule';

export default class Rule implements IRule {
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
