import { ICreatedAt } from 'src/entities/types/timestamps';

export interface IContact extends ICreatedAt {
	id: number;
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
}
