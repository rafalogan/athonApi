import { Schema } from 'mongoose';

import { MediaEntity } from 'src/repositories/types/media';

export class Media implements MediaEntity {
	_id: Schema.Types.ObjectId;
	file: string;
	title: string;
	description?: string;
	type: string;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: MediaEntity, id?: any) {
		this._id = id ?? props._id;
		this.file = props.file;
		this.title = props.title;
		this.description = props.description;
		this.type = props.type;
		this.userId = props.userId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
