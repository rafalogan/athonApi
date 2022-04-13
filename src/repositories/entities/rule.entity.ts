import { RuleEntity } from 'src/repositories/types/rule';
import { setfieldtoDate } from 'src/util';

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
		this.createdAt = setfieldtoDate(props.createdAt);
		this.updatedAt = setfieldtoDate(props.updatedAt);
	}
}
