import { Request, Response } from 'express';

export abstract class AbistractController {
	abstract save(req: Request, res: Response): void | any;
	abstract edit(req: Request, res: Response): void | any;
	abstract list(req: Request, res: Response): void | any;
	abstract remove(req: Request, res: Response): void | any;
}
