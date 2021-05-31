import { IAnswer } from 'src/entities/types/answer';

export class Answer implements IAnswer {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IAnswer, id?: number) {
		this.id = Number(id || props.id);
		this.subject = props.subject;
		this.content = props.content;
		this.contactId = Number(props.contactId);
		this.userId = Number(props.userId);
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}
}
