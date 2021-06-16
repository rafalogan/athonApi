import { Request } from 'express';

import { NoRelationalServiceOptions } from 'src/core/types';
import { Article, ArticleEntity, ArticleListEntity, IArticleModel } from 'src/entities';
import { AuthService } from 'src/services/auth.service';
import { AbstractNoRelationalService } from 'src/core/services';
import { clearTimestamp, existsOrError, ResponseException } from 'src/util';
import httpStatus from 'http-status';

export class ArticleService extends AbstractNoRelationalService<IArticleModel> {
	constructor(private authService: AuthService, options: NoRelationalServiceOptions) {
		super({ ...options, serviceName: AuthService.name });
	}

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
}
