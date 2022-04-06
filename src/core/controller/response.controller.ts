import httpStatus from 'http-status';
import { Response } from 'express';

import { ErrorResponseParams } from 'src/core/types';
import { onError, onWarn } from 'src/util';

export class ResponseController {
	private status = httpStatus;

	constructor() {}

	onSuccess(res: Response, data: any) {
		return res.status(this.status.OK).json(data);
	}

	onError(res: Response, message: string, options?: ErrorResponseParams) {
		const status = options && options.status ? options.status : this.status.INTERNAL_SERVER_ERROR;

		this.setLog(status, message, options?.err);
		return res.status(status).send({
			status,
			message,
		});
	}

	private setLog(status: number, message: string, error?: Error) {
		return status >= 400 && status < 500 ? onWarn(message, error) : onError(message, error);
	}
}
