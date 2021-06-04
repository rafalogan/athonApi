import { CreatedAtField } from 'src/entities';

export interface ContactEntity extends CreatedAtField {
	id: number;
	name: string;
	email: string;
	subject: string;
	phone: string;
	message: string;
}
