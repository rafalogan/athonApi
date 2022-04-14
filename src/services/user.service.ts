import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { ProfileService, RuleService, UserRuleService } from 'src/services';
import { User } from 'src/repositories/entities';
import { AbstractDatabaseService } from 'src/core/services';
import { RelationalReadOptions, RelationalServiceOptions } from 'src/core/types';
import { ResponseCreateUser, RuleEntity, UserEntity, UserRuleEntity, UsersEntity } from 'src/repositories/types';
import { clearTimestampFields, deleteField, equalsOrError, existsOrError, hashString, notExistisOrError, onError } from 'src/util';
import { Pagination } from 'src/repositories/models';

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

	async create(item: User) {
		item.password = hashString(item.password, this.salt);
		deleteField(item, 'confirmPassword');

		return super
			.create(item)
			.then((result: ResponseCreateUser) => {
				result.data = deleteField(result.data, 'password');
				return result;
			})
			.catch(err => err);
	}

	read(options?: RelationalReadOptions): Promise<UsersEntity | UserEntity> {
		return super
			.read(options)
			.then(async (result: UserEntity | UsersEntity) =>
				'data' in result ? this.setUsers(result as UsersEntity) : this.setUser(result as UserEntity)
			)
			.catch(error => error);
	}

	findByEmail(email: string) {
		return this.instance(this.table)
			.select()
			.where({ email })
			.first()
			.then((user: UserEntity) => this.setUser(user))
			.catch(err => err);
	}

	private setUsers(result: UsersEntity): UsersEntity {
		const data = result.data.map(item => clearTimestampFields(item)) as UserEntity[];
		const pagination = new Pagination(result.pagination);
		return { data, pagination };
	}

	private async setUser(result: UserEntity): Promise<UserEntity> {
		const profile = await this.profileService.readOne(result.profileId);
		const permissions: RuleEntity[] = await this.setUserRules(Number(result?.id));

		return { ...result, profile, permissions };
	}

	private async setUserRules(userId: number): Promise<RuleEntity[]> {
		const rulesIds = await this.userRuleService.read({ userId });

		return rulesIds.map((rule: UserRuleEntity) => this.ruleService.read({ id: rule.ruleId }));
	}
}
