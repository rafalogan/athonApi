import httpStatus from 'http-status';

import { ProfileService, RuleService, UserRuleService, UserServiceOptions } from 'src/services';
import { equalsOrError, existsOrError, hashString, notExistisOrError } from 'src/util';
import { ListUsers, Rule, User, UserEntity } from 'src/entities';
import { AbstractRelationalService } from 'src/core/services';
import { RelationalReadOptions } from 'src/core/types';

const fields = ['id', 'name', 'email', 'password', 'profile_id as profileId', 'deleted_at as deletedAt'];

export class UserService extends AbstractRelationalService {
	private profileService: ProfileService;
	private userRuleService: UserRuleService;
	private ruleService: RuleService;
	private salt: number;

	constructor(userServiceOptions: UserServiceOptions) {
		super({ ...userServiceOptions, table: 'users', serviceName: UserRuleService.name, fields });
		this.profileService = userServiceOptions.profileService;
		this.userRuleService = userServiceOptions.userRuleService;
		this.ruleService = userServiceOptions.ruleService;
		this.salt = userServiceOptions.salt;
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
		} catch (msg) {
			return { code: httpStatus.BAD_REQUEST, msg };
		}
	}

	async create(item: User): Promise<any> {
		item.password = hashString(item.password, this.salt);
		Reflect.deleteProperty(item, 'confirmPassword');

		return super.create(item);
	}

	async read(options?: RelationalReadOptions): Promise<User | ListUsers> {
		return super.read(options).then(result => (result.data ? this._setUserList(result) : this._setUserRules(result)));
	}

	findByEmail(email: string) {
		return this.instance(this.table)
			.select()
			.where({ email })
			.then((user: any) => this._setUserRules(user))
			.catch(err => this.log.error(`Find user by email: ${email} failed`, err));
	}

	private _setUserList(result: any) {
		result.data = result.data.map(this._setUserRules).map((item: User) => Reflect.deleteProperty(item, 'password'));
		return result;
	}

	private async _setUserRules(user: any) {
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
