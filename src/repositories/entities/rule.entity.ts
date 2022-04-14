import { RuleEntity } from 'src/repositories/types/rule';
import { setFieldToDate } from 'src/util';

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
		this.createdAt = setFieldToDate(props.createdAt);
		this.updatedAt = setFieldToDate(props.updatedAt);
	}
}
