import { Schema } from 'mongoose';

import { ISocialMedia } from 'src/core/entities/types/social-media';

export default class SocialMedia implements ISocialMedia {
	_id: Schema.Types.ObjectId;
	url: string;
	visible: boolean;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: ISocialMedia, id: Schema.Types.ObjectId) {
		this._id = id || props._id;
		this.url = props.url;
		this.visible = props.visible;
		this.userId = props.userId;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
