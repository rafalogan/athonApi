import { IProfileRule } from 'src/core/entities/types/profile-rule';

export class ProfileRule implements IProfileRule {
	profileId: number;
	ruleId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IProfileRule) {
		this.profileId = props.profileId;
		this.ruleId = props.ruleId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
