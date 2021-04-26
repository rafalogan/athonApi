export interface IContact {
	id: number;
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
	createdAt?: Date;
}
