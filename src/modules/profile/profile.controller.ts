import { Request, Response } from 'express';

import { AbistractController, ResponseController } from 'src/core/controller';
import { ProfileService } from 'src/services';
import { Profile } from 'src/entities';

export class ProfileController extends AbistractController {
	constructor(private profileService: ProfileService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const profile = new Profile(req.body);

		this.profileService
			.create(profile)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		const profile = new Profile(req.body, Number(req.params.id));

		this.profileService
			.update(profile, profile.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.profileService
			.read({ id, page, limit })
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.profileService
			.delete(id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}
}
