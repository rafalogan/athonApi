import { Request } from 'express';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';

import { categoryWithChildren, existsOrError, notExistisOrError } from 'src/util';
import { LoginService } from 'src/services/login.service';
import { AbstractDatabaseService } from 'src/core/services';
import { Category } from 'src/repositories/entities';
import { CategoriesEntity, CategoryEntity, ReadTableOptions, RelationalServiceOptions } from 'src/repositories/types';

const fields = [
	'id',
	'name',
	'description',
	'url',
	'status',
	'parent_id as parentId',
	'user_id as userId',
	'created_at as createAt',
	'updated_at as updateAt',
];

export class CategoryService extends AbstractDatabaseService {
	constructor(private loginService: LoginService, conn: Knex, cache: RedisClientType, options: RelationalServiceOptions) {
		super(conn, cache, 'categories', { ...options, fields });
	}

	setCategory(req: Request) {
		const id = Number(req.params.id);
		const userId = this.loginService.getPayload(req)?.id;

		return new Category(req.body, id, userId);
	}

	async categoryValidate(category: Category) {
		const fromDB = await this.read({ id: category?.id });

		notExistisOrError(fromDB, 'Category is already registered');
		existsOrError(category.name, 'Name is required');
		existsOrError(category.status, 'Status is required');
	}

	async create(item: Category) {
		try {
			await this.categoryValidate(item);
		} catch (err) {
			return err;
		}

		return super
			.create(item)
			.then(result => result)
			.catch(err => err);
	}

	read(options?: ReadTableOptions) {
		return super
			.read(options)
			.then(result => ('data' in result ? this.setCategories(result) : this.setCategoryResult(result)))
			.catch(err => err);
	}

	private setCategories(categories: CategoriesEntity) {
		const data = categories.data.map(category => this.setCategoryResult(category));

		return {
			...categories,
			data,
		};
	}

	private setCategoryResult(category: CategoryEntity) {
		return category?.id
			? this.subCategories(category)
					.then(result => new Category(result))
					.catch(err => err)
			: new Category(category);
	}

	private async subCategories(category: Category | CategoryEntity): Promise<CategoryEntity> {
		const subCategories: CategoryEntity[] = (await this.readByParentId(Number(category?.id))) || [];

		if (subCategories.length > 0) {
			for (const subCategory of subCategories) {
				await this.subCategories(subCategory);
			}
		}

		category.subCategories = subCategories;

		return category;
	}

	readByParentId(parentId: number) {
		return this.instance(this.table)
			.select(...this.fields)
			.where({ parentId })
			.then((result: CategoryEntity[]) => result)
			.catch(err => err);
	}

	categoryWithChildren(categoryId: number) {
		return this.instance
			.raw(categoryWithChildren, [categoryId])
			.then(result => result[0])
			.catch(err => err);
	}
}
