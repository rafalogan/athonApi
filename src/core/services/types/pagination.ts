export interface IPaginationOptions {
	page?: number;
	total?: number;
}

export interface IPagination {
	count: number;
	page: number;
	pages: number;
	limit: number;
}
