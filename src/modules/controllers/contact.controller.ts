import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { AbstractController, ResponseController } from 'src/core/controller';
import { ContactService } from 'src/services';
import { Contact } from 'src/repositories/entities';
import { ContactsEntity } from 'src/repositories/types';

export class ContactController extends AbstractController {
	constructor(private contactService: ContactService) {
		super();
	}

	save(req: Request, res: Response) {
		const data = new Contact(req.body);

		try {
			this.contactService.validateFields(data);
		} catch (error: any) {
			return ResponseController.onError(res, error.message, { err: error, status: httpStatus.BAD_REQUEST });
		}

		this.contactService
			.create(data)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const contact = new Contact(req.body, Number(req.params.id));

		this.contactService
			.update(contact.id, contact)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.contactService
			.read({ id, page, limit })
			.then(result => (result.data ? this.setContacts(result) : new Contact(result)))
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		this.contactService
			.delete(id)
			.then(result => ResponseController.onSuccess(res, result))
			.catch(err => ResponseController.onError(res, 'unexpected error', { err }));
	}

	private setContacts(result: ContactsEntity) {
		const data = result.data.map(item => new Contact(item));
		return { ...result, data };
	}
}
