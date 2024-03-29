import { PaginationDomain, PaginationOptions } from 'src/repositories/types';

export class Pagination implements PaginationDomain {
	count: number;
	page: number;
	pages: number;
	limit: number;

	constructor(options: PaginationOptions) {
		this.count = options.count;
		this.page = options.page;
		this.pages = this.setPages(options);
		this.limit = options.limit;
	}

	private setPages(options: PaginationOptions) {
		const { count, limit } = options;
		return Number(Math.ceil(count / limit));
	}
}
