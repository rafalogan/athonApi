import { Request, Response } from 'express';

import { AbstractController } from 'src/core/controller';
import { AnswerService } from 'src/services';
import { Answer } from 'src/repositories/entities';

export class AnswerController extends AbstractController {
	constructor(private answerService: AnswerService) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.answerService.validateFields(req.body);

		if (!(data instanceof Answer)) return this.response.onError(res, data.message, data);

		this.answerService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const data = new Answer(req.body, Number(req.params.id));

		this.answerService
			.update(data, data.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.answerService
			.read({ id, page, limit })
			.then(async item => {
				if (item.data) return this.response.onSuccess(res, this.answerService.createAnswerList(item));

				const data = new Answer(item);
				data.contact = await this.answerService.findContact(data.contactId);

				return this.response.onSuccess(res, data);
			})
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const deleted = await this.answerService.delete(id);

			return deleted.status ? this.response.onError(res, deleted.message, deleted) : this.response.onSuccess(res, deleted);
		} catch (err) {
			this.response.onError(res, 'unexpected error', { err });
		}
	}
}
