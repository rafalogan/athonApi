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
}
