import { IProfile } from 'src/core/entities/types/profile';

export default class Profile implements IProfile {
	id: number;
	title: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IProfile, id?: number) {
		this.id = Number(id ? id : props.id);
		this.title = props.title;
		this.description = props.description;
		this.createdAt = props?.createdAt;
		this.updatedAt = props?.updatedAt;
	}
}
