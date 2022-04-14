import { LoginService, ContactService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { Application } from 'express';
import { ContactController } from 'src/api/contact/contact.controller';
import { ContactRouter } from 'src/api/contact/contact.router';

export default class ContactModule {
	private contactController: ContactController;
	private contactRouter: ContactRouter;

	constructor(
		private contactService: ContactService,
		private responseController: ResponseController,
		app: Application,
		auth: LoginService
	) {
		this.contactController = new ContactController(this.contactService, this.responseController);
		this.contactRouter = new ContactRouter(this.contactController, app, auth);
	}

	init() {
		return this.contactRouter.exec();
	}
}
