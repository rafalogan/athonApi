import { Request, Response } from 'express';

import { AbstractController, ResponseController } from 'src/core/controller';
import { AnswerService } from 'src/services';

export class AnswerController extends AbstractController {
	constructor(private answerService: AnswerService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {}

	edit(req: Request, res: Response) {}

	list(req: Request, res: Response) {}

	remove(req: Request, res: Response) {}
}
