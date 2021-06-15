import { Document } from 'mongoose';

import { Timestampsfileds } from 'src/entities';
import { Pagination } from 'src/core/domains';

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
