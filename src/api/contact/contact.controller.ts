import { Request, Response } from 'express';
import { AbstractController, ResponseController } from 'src/core/controller';
import { ContactService } from 'src/services';
import { Contact } from 'src/repositories/entities';

export class ContactController extends AbstractController {
	constructor(private contactService: ContactService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {
		const data = this.contactService.validateFields(req.body);

		if (!(data instanceof Contact)) return this.response.onError(res, data.message, { status: data.code });

		this.contactService
			.create(data)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	edit(req: Request, res: Response) {
		const contact = new Contact(req.body, Number(req.params.id));

		this.contactService
			.update(contact, contact.id)
			.then(result => this.response.onSuccess(res, result))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.contactService
			.read({ id, page, limit })
			.then(item => this.response.onSuccess(res, item.data ? this.contactService.listContacts(item) : new Contact(item)))
			.catch(err => this.response.onError(res, 'unexpected error', { err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		try {
			const deleted = await this.contactService.delete(id);

			return deleted.status ? this.response.onError(res, deleted.message, deleted) : this.response.onSuccess(res, deleted);
		} catch (err) {
			this.response.onError(res, 'unexpected error', { err });
		}
	}
}
