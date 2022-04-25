import { NewsletterEntity } from 'src/repositories/types/newsletter';

export class Newsletter implements NewsletterEntity {
	id: number;
	name: string;
	email: string;
	active: boolean;
	createAt?: Date;
	updateAt?: Date;

	constructor(props: NewsletterEntity, id?: number) {
		this.id = Number(id || props.id);
		this.name = props.name;
		this.email = props.email;
		this.active = props.active;
		this.createAt = props.createdAt;
		this.updateAt = props.updatedAt;
	}
}
