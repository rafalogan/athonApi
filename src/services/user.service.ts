import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import httpStatus from 'http-status';

import { ProfileService, RuleService, UserRuleService, UserServiceOptions } from 'src/services';
import { User } from 'src/repositories/entities';
import { AbstractDatabaseService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { UserEntity } from 'src/repositories/types';
import { equalsOrError, existsOrError, hashString, notExistisOrError, onError } from 'src/util';

const fields = ['id', 'name', 'email', 'password', 'profile_id as profileId', 'deleted_at as deletedAt'];

export class UserService extends AbstractDatabaseService {
	constructor(
		private profileService: ProfileService,
		private userRuleService: UserRuleService,
		private ruleService: RuleService,
		private salt: number,
		conn: Knex,
		cache: RedisClientType,
		options: RelationalServiceOptions
	) {
		super(conn, cache, 'user', { ...options, fields });
	}

	async userValidate(user: User) {
		const userDB = await this.findByEmail(user.email);

		try {
			existsOrError(user.name, 'Field Name is required.');
			existsOrError(user.email, 'Field E-mail is required.');
			existsOrError(user.password, 'Field Password is required.');
			existsOrError(user.confirmPassword, 'Field Confirm Password');
			equalsOrError(user.password, user.confirmPassword, 'passwords do not match.');
			notExistisOrError(userDB, `User ${user.email}, already registered`);
			return;
		} catch (err) {
			return err;
		}
	}

	async create(item: User): Promise<any> {
		item.password = hashString(item.password, this.salt);
		Reflect.deleteProperty(item, 'confirmPassword');

		return super.create(item);
	}

	async read(options?: RelationalReadOptions) {
		return super.read(options).then(result => (result.data ? this.setUserList(result) : this._setUserRules(result)));
	}

	findByEmail(email: string) {
		return this.instance(this.table)
			.select()
			.where({ email })
			.then((user: any) => user)
			.catch(err => err);
	}

	private setUserList(result: any) {
		result.data = result.data
			.map(this._setUserRules)
			.map((item: UserEntity) => new User(item))
			.map((item: User) => {
				Reflect.deleteProperty(item, 'password');
				Reflect.deleteProperty(item, 'profileId');
				Reflect.deleteProperty(item, 'permissions');
				return item;
			});
		return result;
	}

	private async setUserRules(user: any) {
		const { id } = user;

		user.profile = await this.profileService.read({ id });
		user.permissions = await this._findRulesByUser(id);

		return new User(user);
	}

	private async _findRulesByUser(userId: number) {
		const rulesIds = await this.userRuleService.findRulesByUserId(userId);

		return Array.isArray(rulesIds)
			? rulesIds.map(async (item: { ruleId: number }) => {
					const { ruleId: id } = item;
					return await this.ruleService.read({ id });
			  })
			: [];
	}
}
