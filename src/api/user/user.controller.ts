import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { UserService } from 'src/services';
import { User } from 'src/repositories/entities';

export class UserController extends AbstractController {
	constructor(private userService: UserService, private response: ResponseController) {
		super();
	}

	async save(req: Request, res: Response) {
		const user = new User(req.body);
		const isNotValidUser = await this.userService.userValidate(user);

		if (isNotValidUser) return this.response.onError(res, isNotValidUser.msg, { status: isNotValidUser.code });

		this.userService
			.create(user)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async edit(req: Request, res: Response) {
		const user = new User(req.body, Number(req.params.id));

		this.userService
			.update(user, user.id)
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.userService
			.read({ id, page, limit })
			.then(data => this.response.onSuccess(res, data))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		try {
			const deleted = await this.userService.delete(id);

			return deleted.status
				? this.response.onError(res, deleted.message, { status: deleted.status })
				: this.response.onSuccess(res, deleted);
		} catch (err) {
			return this.response.onError(res, 'unexpected error', { err });
		}
	}
}
