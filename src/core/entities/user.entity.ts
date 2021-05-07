import { IUser } from 'src/core/entities/types/user';

export class User implements IUser {
	id: number;
	name: string;
	email: string;
	password: string;

	public profileId: number;
	deleteAt?: Date;

	constructor(props: IUser, id?: number) {
		this.id = Number(id ? id : props.id);
		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.profileId = Number(props.profileId);
		this.deleteAt = props?.deleteAt;
	}
}
