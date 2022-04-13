import { AuthenticateOptions, Strategy } from 'passport';

export interface IAuthConfig {
	authenticate: (strategy: string | string[] | Strategy, options: AuthenticateOptions, callback?: (...args: any[]) => any) => any;
}
