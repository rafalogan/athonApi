import { SocialmediaEntity } from 'src/repositories/types/social-media';

export class SocialMedia implements SocialmediaEntity {
	_id?: any;
	label: string;
	url: string;
	visible: boolean;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(params: SocialmediaEntity, id?: any) {
		this._id = id ?? params._id;
		this.label = params.label;
		this.url = params.url;
		this.visible = params.visible;
		this.userId = params.userId;
		this.createdAt = params.createdAt;
		this.updatedAt = params.updatedAt;
	}
}
