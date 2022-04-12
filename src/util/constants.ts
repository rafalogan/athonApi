import { CorsOptions, CorsOptionsDelegate } from 'cors';

export const DEFAULT_CORSOPTIONS: CorsOptions | CorsOptionsDelegate = {
	origin: '*',
	optionsSuccessStatus: 200,
};
