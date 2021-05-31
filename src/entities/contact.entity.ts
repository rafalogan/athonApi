import { IContact } from 'src/entities/types/contact';

export class Contact implements IContact {
	id: number;
	name: string;
	email: string;
	phone: string;
	message: string;
	subject: string;
	createdAt?: Date;

	constructor(props: IContact, id?: number) {
		this.id = Number(id || props.id);
		this.name = props.name;
		this.email = props.email;
		this.phone = props.phone;
		this.message = props.message;
		this.subject = props.subject;
		this.createdAt = props.createdAt;
	}
}
