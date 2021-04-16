export interface ISecurity {
	saltRounds: number;
	EnableHTTPS: boolean;
	cert: string;
	key: string;
	authSecret: string;
}
