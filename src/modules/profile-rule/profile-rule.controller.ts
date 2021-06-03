import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { ProfileRuleService } from 'src/services';
import { ProfileRule } from 'src/entities';

export class ProfileRuleController extends AbstractController {
	constructor(private profileRuleService: ProfileRuleService, private response: ResponseController) {
		super();
	}

	async save(req: Request, res: Response) {
		const data = await this.profileRuleService.validateRequireFields(req.body);

		if (!(data instanceof ProfileRule)) return this.response.onError(res, data.message, undefined, data.code);

		this.profileRuleService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		this.response.onError(res, 'Not Fund', undefined, httpStatus.NOT_FOUND);
	}

	list(req: Request, res: Response) {
		const id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.profileRuleService
			.read({ id, limit, page })
			.then(data => this.response.onSuccess(res, data.data ? this.profileRuleService.createProfileRuleList(data) : new ProfileRule(data)))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		this.profileRuleService
			.delete(req.params.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}
}
