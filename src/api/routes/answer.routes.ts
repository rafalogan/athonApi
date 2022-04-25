import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { AnswerController } from 'src/api/controllers/answer.controller';
import { IAuthConfig } from 'src/repositories/types';

export class AnswerRoutes extends AbstractRoutes {
	constructor(private answerController: AnswerController, app: Application, auth: IAuthConfig) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/answers')
			.all(this.auth?.authenticate())
			.get(this.answerController.list.bind(this.answerController))
			.post(this.answerController.save.bind(this.answerController));

		this.app
			.route('/answers/:id')
			.all(this.auth?.authenticate())
			.get(this.answerController.list.bind(this.answerController))
			.put(this.answerController.edit.bind(this.answerController))
			.delete(this.answerController.remove.bind(this.answerController));
	}
}
