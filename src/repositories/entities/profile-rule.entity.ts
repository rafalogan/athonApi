import { ProfileRuleEntity } from 'src/repositories/types/profile-rule';

export class ProfileRule implements ProfileRuleEntity {
	profileId: number;
	ruleId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: ProfileRuleEntity, id?: string) {
		const [profileId, ruleId] = id ? id.split('-').map(Number) : '';

		this.profileId = Number(profileId ?? props.profileId);
		this.ruleId = Number(ruleId ?? props.ruleId);
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
