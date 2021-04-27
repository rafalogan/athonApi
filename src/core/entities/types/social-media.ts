import { Schema, Document } from 'mongoose';

import { ITimestampsfileds } from 'src/core/entities/types/timestamps';

export interface ISocialMedia extends ITimestampsfileds {
	_id: Schema.Types.ObjectId;
	url: string;
	visible: boolean;
	userId: number;
}

export interface ISocialMediaModel extends Document {
	url: string;
	visible: boolean;
	userId: number;
}
