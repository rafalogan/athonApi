import { UserRuleEntity } from 'src/repositories/entities/index';

export class UserRule implements UserRuleEntity {
	userId: number;
	ruleId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: UserRuleEntity, id?: string) {
		const [userId, ruleId] = id ? id.split('-') : '';

		this.userId = Number(userId ?? props.userId);
		this.ruleId = Number(ruleId ?? props.ruleId);
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
