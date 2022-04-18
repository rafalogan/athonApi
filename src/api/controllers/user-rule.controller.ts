import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { ResponseController } from 'src/core/controller';
import { UserRuleService } from 'src/services';
import { UserRule } from 'src/repositories/entities';
import { UserRuleEntity, UserRulesEntity } from 'src/repositories/types';

export class UserRuleController {
	constructor(private userRuleService: UserRuleService) {}

	async save(req: Request, res: Response) {
		const data = new UserRule(req.body);

		try {
			await this.userRuleService.validateFields(data);
		} catch (err: any) {
			return ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST });
		}

		this.userRuleService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.userRuleService
			.read({ id, page, limit })
			.then(raw => (raw.data ? this.setUsersRules(raw) : raw.map((item: UserRuleEntity) => new UserRule(item))))
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		this.userRuleService
			.delete(req.params.id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	private setUsersRules(result: UserRulesEntity) {
		const data = result.data.map(item => new UserRule(item));
		return { ...result, data };
	}
}
