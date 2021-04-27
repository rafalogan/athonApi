import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IUserRule extends ITimestampsfileds {
	userId: number;
	ruleId: number;
}
