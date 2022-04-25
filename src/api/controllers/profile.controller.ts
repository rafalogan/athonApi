import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { ProfileService } from 'src/services';
import { Profile } from 'src/repositories/entities';

export class ProfileController extends AbstractController {
	constructor(private profileService: ProfileService) {
		super();
	}

	save(req: Request, res: Response) {
		const profile = new Profile(req.body);

		try {
			this.profileService.profileValeidate(profile);
		} catch (err: any) {
			return ResponseController.onError(res, err.message, { err, status: httpStatus.BAD_REQUEST });
		}

		this.profileService
			.create(profile)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		const profile = new Profile(req.body, Number(req.params.id));

		this.profileService
			.update(profile.id, profile)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.profileService
			.read({ id, page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.profileService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', err));
	}
}
