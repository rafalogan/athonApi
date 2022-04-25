export interface IConnectionContext {
	connection: () => Promise<any | void>;
	latest?: () => Promise<any>;
	rollback?: () => Promise<any>;
}
