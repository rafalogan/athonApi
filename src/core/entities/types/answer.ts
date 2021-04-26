export interface IAnswer {
	id: number;
	subject: string;
	content: string;
	contactId: number;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;
}
