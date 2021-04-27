import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface IProfileRule extends ITimestampsfileds {
	profileId: number;
	ruleId: number;
}
