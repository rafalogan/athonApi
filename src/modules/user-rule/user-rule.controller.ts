import { AbstractController, ResponseController } from 'src/core/controller';
import { UserRuleService } from 'src/services';

export class UserRuleController extends AbstractController {
	constructor(private userRuleService: UserRuleService, private response: ResponseController) {
		super();
	}

	save(req: Request, res: Response) {}
}
