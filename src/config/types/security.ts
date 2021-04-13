export interface ISecurity {
	saltRounds: number;
	enableHttps: boolean;
	certificate?: any;
	key?: any;
	authSecret: string;
}
