import { Timestampsfileds } from 'src/entities';

export interface UserRuleEntity extends Timestampsfileds {
	userId: number;
	ruleId: number;
}
