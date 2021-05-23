import { AbstractRelationalService } from 'src/core/services';
import { ICServiceOptions, IRPginationOptions, IRServiceOptions } from 'src/core/services/types';
import { IEnvServiceOptions } from 'src/services/types';

export class ProfileService extends AbstractRelationalService {
	constructor(proflieServiceOptions: IRServiceOptions, cacheOptions: ICServiceOptions, env: IEnvServiceOptions) {
		super(proflieServiceOptions, cacheOptions, env);
	}

	read(options?: IRPginationOptions): Promise<any> {
		return super.read(options);
	}

	findProfileById(id: number, fields: string[] = []) {
		this.instance(this.table).select().where({ id }).innerJoin();
	}
}
