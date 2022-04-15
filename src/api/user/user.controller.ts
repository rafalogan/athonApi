import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { UserService } from 'src/services';
import { User } from 'src/repositories/entities';

export class UserController extends AbstractController {
	constructor(private userService: UserService) {
		super();
	}

	async save(req: Request, res: Response) {
		const user = new User(req.body);

		try {
			await this.userService.userValidate(user);
		} catch (error: any) {
			return ResponseController.onError(res, error.message, { status: httpStatus.BAD_REQUEST });
		}

		this.userService
			.create(user)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async edit(req: Request, res: Response) {
		const user = new User(req.body, Number(req.params.id));

		this.userService
			.update(user.id, user)
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.userService
			.read({ id, page, limit })
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.userService
			.delete(id)
			.then(data => ResponseController.onSuccess(res, data))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}
}
