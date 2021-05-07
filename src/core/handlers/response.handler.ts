import { Response } from 'express';
import httpStatus from 'http-status';

import { LogHandler } from 'src/core/handlers/log.handler';

export class ResponseHandler {
	private status = httpStatus;

	constructor(private log: LogHandler) {}

	onSuccess(res: Response, data: any) {
		return res.status(this.status.OK).json(data);
	}

	onError(res: Response, message: string, err?: Error, status = this.status.INTERNAL_SERVER_ERROR) {
		status >= 400 && status < 500 ? this.log.warn(message, err) : this.log.error(message, err);
		return res.status(status).send(message);
	}
}
