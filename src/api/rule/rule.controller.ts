import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { RuleService } from 'src/services';
import { Rule } from 'src/repositories/entities';
import httpStatus from 'http-status';

export class RuleController extends AbstractController {
	constructor(private ruleService: RuleService) {
		super();
	}

	async save(req: Request, res: Response) {
		const rule = new Rule(req.body);

		try {
			await this.ruleService.validateFields(rule);
		} catch (err: any) {
			return ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST });
		}

		this.ruleService
			.create(rule)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		const rule = new Rule(req.body, Number(req.params.id));

		this.ruleService
			.update(rule.id, rule)
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.ruleService
			.read({ id, page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.ruleService
			.delete(id)
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}
}
