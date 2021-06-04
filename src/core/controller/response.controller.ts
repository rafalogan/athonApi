import httpStatus from 'http-status';
import { Response } from 'express';

import { LogController } from 'src/core/controller/log.controller';
import { ErrorResponseParams } from 'src/core/types';

export class ResponseController {
	private status = httpStatus;

	constructor(private log: LogController) {}

	onSuccess(res: Response, data: any) {
		return res.status(this.status.OK).json(data);
	}

	onError(res: Response, message: string, options?: ErrorResponseParams) {
		const status = this._setStatus(options?.status);

		status >= 400 && status < 500 ? this.log.warn(message, options?.err) : this.log.error(message, options?.err);
		return res.status(status).send(message);
	}

	private _setStatus(status?: number) {
		return status ?? this.status.INTERNAL_SERVER_ERROR;
	}
}
