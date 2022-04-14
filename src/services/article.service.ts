import httpStatus from 'http-status';
import { Request } from 'express';

import { NoRelationalServiceOptions } from 'src/core/types';
import { Article, ArticleEntity, ArticleListEntity, IArticleModel } from 'src/repositories/entities';
import { LoginService } from 'src/services';
import { AbstractNoRelationalService } from 'src/core/services';
import { clearTimestamp, existsOrError, ResponseException } from 'src/util';

export class ArticleService {
	constructor(private authService: LoginService, options: NoRelationalServiceOptions) {}

	articleFilter(req: Request) {
		try {
			const raw: ArticleEntity = req.body;
			raw.userId = Number(raw.userId || this.authService.getPayload(req)?.id);

			existsOrError(raw.content, 'Content field is required.');
			existsOrError(raw.categoryId, 'CategoryId field is required.');

			return new Article(raw);
		} catch (message) {
			const err = new ResponseException(message);

			return { status: httpStatus.BAD_REQUEST, message, err };
		}
	}

	creatListAitcles(raw: ArticleListEntity) {
		const { pagination } = raw;
		const data = raw.data.map(item => new Article(item)).map(clearTimestamp);

		return { data, pagination };
	}

	articlesByCategoryId(categoryId: any) {
		return this.instanceModel
			.find()
			.where({ categoryId })
			.exec()
			.then(articles => articles.map(article => new Article(article)))
			.catch(err => this.log.error(`Find articles by category ${categoryId} is failed`, err));
	}
}
