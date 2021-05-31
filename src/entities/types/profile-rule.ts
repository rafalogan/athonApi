import { ITimestampsfileds } from 'src/entities/types/timestamps';

export interface IProfileRule extends ITimestampsfileds {
	profileId: number;
	ruleId: number;
}
