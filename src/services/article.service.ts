import { Request } from 'express';

import { Article, FileMedia } from 'src/repositories/entities';
import { CategoryService, FileService, LoginService } from 'src/services';
import { clearTimestampFields, existsOrError, IMAGE_MIME_TYPE, VIDEO_MIME_TYPE } from 'src/util';
import { AbstractDatabaseService } from 'src/core/services';
import { Knex } from 'knex';
import { RedisClientType } from 'redis';
import {
	ArticleEntity,
	ArticlestEntity,
	CategoryEntity,
	FileEntity,
	ReadTableOptions,
	RelationalServiceOptions,
} from 'src/repositories/types';

const fields = [
	'id',
	'title',
	'subtitle',
	'description',
	'content',
	'user_id as userId',
	'category_id as categoryId',
	'created_at as createdAt',
	'updated_at as updatedAt',
];

export class ArticleService extends AbstractDatabaseService {
	constructor(
		private loginService: LoginService,
		private fileService: FileService,
		private categoryService: CategoryService,
		conn: Knex,
		cache: RedisClientType,
		options: RelationalServiceOptions
	) {
		super(conn, cache, 'articles', { ...options, fields });
	}

	setArticle(req: Request) {
		const id = Number(req.params.id);
		const userId = this.loginService.getPayload(req)?.id;

		return new Article(req.body, id, userId);
	}

	articleFilter(data: Article) {
		existsOrError(data.title, 'Title is required');
		existsOrError(data.content, 'Content field is required.');
		existsOrError(data.categoryId, 'CategoryId field is required.');
	}

	async getArticlesByCategoryId(categoryId: number, options?: ReadTableOptions) {
		const raw = await this.categoryService.categoryWithChildren(categoryId);
		const ids = raw.map((item: CategoryEntity) => item.id);
		const limit = Number(options?.limit || 10);
		const page = Number(options?.page || 1);

		return this.instance({ a: 'articles', u: 'users' })
			.select('a.id', 'a.title', 'a.description', { author: 'u.name' })
			.limit(limit)
			.offset(page * limit - limit)
			.whereRaw('?? = ??', ['u.id', 'a.user_id'])
			.whereIn('a.category_id', ids)
			.orderBy('a.id', 'asc')
			.then(result => result)
			.catch(err => err);
	}

	async create(item: Article) {
		try {
			await this.articleFilter(item);
		} catch (error) {
			return error;
		}

		return super.create(item);
	}

	read(options?: ReadTableOptions) {
		return super
			.read(options)
			.then(async result => ('data' in result ? this.setArticles(result) : this.setArticleRead(result)))
			.catch(error => error);
	}

	private setArticles(articles: ArticlestEntity) {
		articles.data = articles.data.map(this.setArticleRead).map(clearTimestampFields);
		return articles;
	}

	private async setArticleRead(article: ArticleEntity) {
		const files: FileEntity[] | FileMedia[] = await this.fileService.read({ articleId: article.id });
		article.content = article.content.toString();
		article.images = files.filter(file => IMAGE_MIME_TYPE.includes(file.fileType));
		article.videos = files.filter(file => VIDEO_MIME_TYPE.includes(file.fileType));
		article.files = files.filter(file => !IMAGE_MIME_TYPE.includes(file.fileType) && !VIDEO_MIME_TYPE.includes(file.fileType));

		return new Article(article);
	}
}
