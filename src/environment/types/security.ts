export interface SecurityOptions {
	saltRounds: number;
	enableHTTPS: boolean;
	cert: string;
	key: string;
	passphrase: string;
	authSecret: string;
}
