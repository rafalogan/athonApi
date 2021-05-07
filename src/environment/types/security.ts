export interface ISecurity {
	saltRounds: number;
	enableHTTPS: boolean;
	cert: string;
	key: string;
	passphrase: string;
	authSecret: string;
}
