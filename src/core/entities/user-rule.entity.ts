import { IUserRule } from 'src/core/entities/types/user-rule';

export default class UserRule implements IUserRule {
	userId: number;
	ruleId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IUserRule) {
		this.userId = props.userId;
		this.ruleId = props.ruleId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
