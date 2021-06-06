import { Application } from 'express';

import { AnswerService, AuthService } from 'src/services';
import { ResponseController } from 'src/core/controller';
import { AnswerController } from 'src/modules/answer/answer.controller';
import { AnswerRouter } from 'src/modules/answer/answer.router';

export default class AnswerModule {
	private answerController: AnswerController;
	private answerRouter: AnswerRouter;

	constructor(answerService: AnswerService, responseController: ResponseController, app: Application, auth: AuthService) {
		this.answerController = new AnswerController(answerService, responseController);
		this.answerRouter = new AnswerRouter(this.answerController, app, auth);
	}

	init() {
		return this.answerRouter.exec();
	}
}
