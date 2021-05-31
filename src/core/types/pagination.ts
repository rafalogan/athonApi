export interface PaginationOptions {
	page: number;
	limit: number;
	count: number;
}

export interface Pagination {
	count: number;
	page: number;
	pages: number;
	limit: number;
}
