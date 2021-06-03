import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { UserRuleService } from 'src/services';
import { UserRule } from 'src/entities';

export class UserRuleController extends AbstractController {
	constructor(private userRuleService: UserRuleService, private response: ResponseController) {
		super();
	}

	async save(req: Request, res: Response) {
		const data = await this.userRuleService.validateFields(req.body);

		if (!(data instanceof UserRule)) return this.response.onError(res, data.message, undefined, data.code);

		this.userRuleService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		this.response.onError(res, 'Not Found', undefined, httpStatus.BAD_REQUEST);
	}

	list(req: Request, res: Response) {
		const id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.userRuleService
			.read({ id, page, limit })
			.then(raw => this.response.onSuccess(res, raw.data ? this.userRuleService.createDataList(raw) : new UserRule(raw)))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		this.userRuleService
			.delete(req.params.id)
			.then(result =>
				result.code ? this.response.onError(res, result.message, undefined, result.code) : this.response.onSuccess(res, result)
			)
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}
}
