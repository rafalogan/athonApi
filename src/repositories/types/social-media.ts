import { Document } from 'mongoose';

import { Timestampsfileds } from 'src/repositories/entities';
import { Pagination } from 'src/repositories/models';

export interface SocialmediaEntity extends Timestampsfileds {
	_id?: any;
	label: string;
	url: string;
	visible: boolean;
	userId: number;
}

export interface SocialmediaListEntity {
	data: SocialmediaEntity[];
	pagination: Pagination;
}

export interface ISocialMediaModel extends Document {
	url: string;
	visible: boolean;
	userId: number;
}
