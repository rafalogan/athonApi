import { RuleEntity } from 'src/entities/types/rule';

export class Rule implements RuleEntity {
	id: number;
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: RuleEntity, id?: number) {
		this.id = Number(id ? id : props.id);
		this.name = props.name;
		this.description = props.description;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
