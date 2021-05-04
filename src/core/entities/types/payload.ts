import { IProfile } from 'src/core/entities/types/profile';

export interface IPayload {
	id: number;
	name: string;
	email: string;
	profile: IProfile;
	iat: number;
	exp: number;
}
