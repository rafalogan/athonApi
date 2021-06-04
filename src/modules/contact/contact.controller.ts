import { Request, Response } from 'express';
import { AbstractController, ResponseController } from 'src/core/controller';
import { ContactService } from 'src/services';
import { Contact } from 'src/entities';

export class ContactController extends AbstractController {
	constructor(private contactService: ContactService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.contactService.validateFields(req.body);

		if (!(data instanceof Contact)) return this.response.onError(res, data.message, undefined, data.code);

		this.contactService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	edit(req: Request, res: Response) {
		const contact = new Contact(req.body, Number(req.params.id));

		this.contactService
			.update(contact, contact.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', err));
	}

	list(req: Request, res: Response) {}

	remove(req: Request, res: Response) {}
}
