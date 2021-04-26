export interface INewsletter {
	id: number;
	name: string;
	email: string;
	active: boolean;
	createAt?: Date;
	updateAt?: Date;
}
