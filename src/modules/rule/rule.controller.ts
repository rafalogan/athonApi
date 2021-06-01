import { Request, Response } from 'express';

import { AbistractControler, ResponseController } from 'src/core/controller';
import { RuleService } from 'src/services';
import { Rule } from 'src/entities';

export class RuleController extends AbistractControler {
	constructor(private ruleService: RuleService, private response: ResponseController) {
		super();
	}

	async save(req: Request, res: Response) {
		const rule = await this.ruleService.validateFields(req.body);

		if (!(rule instanceof Rule)) return this.response.onError(res, rule.message, undefined, rule.code);

		this.ruleService
			.create(rule)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		const rule = new Rule(req.body, Number(req.params.id));

		this.ruleService
			.update(rule, rule.id)
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.ruleService
			.read({ id, page, limit })
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.ruleService
			.delete(id)
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}
}
