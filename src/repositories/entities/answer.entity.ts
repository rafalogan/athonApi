import { AnswerEntity, Contact } from 'src/repositories/entities/index';

export class Answer implements AnswerEntity {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
	contact?: Contact | void;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: AnswerEntity, id?: number) {
		this.id = Number(id ?? props.id);
		this.subject = props.subject;
		this.content = props.content;
		this.contactId = Number(props.contactId);
		this.userId = Number(props.userId);
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
