import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface IUserRule extends ITimestampsfileds {
	userId: number;
	ruleId: number;
}
