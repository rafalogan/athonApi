import { Schema } from 'mongoose';

import { IMedia } from 'src/core/entities/types/media';

export default class Media implements IMedia {
	_id: Schema.Types.ObjectId;
	file: string;
	title: string;
	description: string;
	type: string;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IMedia, id?: Schema.Types.ObjectId) {
		this._id = id || props._id;
		this.file = props.file;
		this.title = props.title;
		this.description = props.description;
		this.type = props.type;
		this.userId = props.userId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
