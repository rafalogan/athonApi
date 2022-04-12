import { Application } from 'express';

import { AbstractRoutes } from 'src/core/routes';
import { AuthService } from 'src/services';
import { AnswerController } from 'src/api/answer/answer.controller';

export class AnswerRouter extends AbstractRoutes {
	constructor(private answerController: AnswerController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	exec() {
		this.app
			.route('/answers')
			.all(this.auth?.init().authenticate())
			.get(this.answerController.list.bind(this.answerController))
			.post(this.answerController.save.bind(this.answerController));

		this.app
			.route('/answers/:id')
			.all(this.auth?.init().authenticate())
			.get(this.answerController.list.bind(this.answerController))
			.put(this.answerController.edit.bind(this.answerController))
			.delete(this.answerController.remove.bind(this.answerController));
	}
}
