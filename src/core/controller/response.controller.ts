import httpStatus from 'http-status';
import { Response } from 'express';

import { LogController } from 'src/core/controller/log.controller';

export class ResponseController {
	private status = httpStatus;

	constructor(private log: LogController) {}

	onSuccess(res: Response, data: any) {
		return res.status(this.status.OK).json(data);
	}

	onError(res: Response, message: string, err?: Error | any, status = this.status.INTERNAL_SERVER_ERROR) {
		status >= 400 && status < 500 ? this.log.warn(message, err) : this.log.error(message, err);
		return res.status(status).send(message);
	}
}
