import { INewsletter } from 'src/core/entities/types/newsletter';

export default class Newsletter implements INewsletter {
	id: number;
	name: string;
	email: string;
	active: boolean;
	createAt?: Date;
	updateAt?: Date;

	constructor(props: INewsletter, id?: number) {
		this.id = Number(id || props.id);
		this.name = props.name;
		this.email = props.email;
		this.active = props.active;
		this.createAt = props.createAt;
		this.updateAt = props.updateAt;
	}
}
