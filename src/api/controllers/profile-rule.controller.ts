import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { ResponseController } from 'src/core/controller';
import { ProfileRuleService } from 'src/services';
import { ProfileRule } from 'src/repositories/entities';
import { ProfileRuleEntity, ProfileRuleListEntity } from 'src/repositories/types';

export class ProfileRuleController {
	constructor(private profileRuleService: ProfileRuleService) {}

	async save(req: Request, res: Response) {
		const data = new ProfileRule(req.body);

		try {
			await this.profileRuleService.validateRequireFields(data);
		} catch (err: any) {
			return ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST });
		}

		this.profileRuleService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const [profileId, ruleId] = req.params.id.split('-').map(Number);
		const id = req.params.id;
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.profileRuleService
			.read({ id, ruleId, profileId, limit, page })
			.then(result => (result.data ? this.setProfilesRule(result) : result.map((item: ProfileRuleEntity) => new ProfileRule(item))))
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		this.profileRuleService
			.delete(req.params.id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	private setProfilesRule(item: ProfileRuleListEntity) {
		const data = item.data.map(item => new ProfileRule(item));

		return {
			...item,
			data,
		};
	}
}
