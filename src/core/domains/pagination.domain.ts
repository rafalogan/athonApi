import { Pagination, PaginationOptions } from 'src/core/types';

export class PaginationDomain implements Pagination {
	count: number;
	page: number;
	pages: number;
	limit: number;

	constructor(options: PaginationOptions) {
		this.count = options.count;
		this.page = options.page;
		this.pages = this._setPages(options);
		this.limit = options.limit;
	}

	private _setPages(options: PaginationOptions) {
		const { count, limit } = options;
		return Number(Math.ceil(count / limit));
	}
}
