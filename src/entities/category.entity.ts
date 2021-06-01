import { Schema, Document } from 'mongoose';
import { CategoryEntity } from 'src/entities/types/category';

export class Category extends Document implements CategoryEntity {
	_id: Schema.Types.ObjectId;
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId: Schema.Types.ObjectId;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: CategoryEntity, id?: Schema.Types.ObjectId) {
		super();
		this._id = id || props._id;
		this.name = props.name;
		this.description = props.description;
		this.url = props.url;
		this.status = props.status;
		this.parentId = props.parentId;
		this.userId = props.userId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
