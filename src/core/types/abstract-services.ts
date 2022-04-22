export interface RelationalServiceOptions extends CacheServiceOptions {
	fields?: string[];
}

export interface CacheServiceOptions {
	active?: boolean;
	nodeEnv?: string;
	cacheTime?: number;
}

export interface ReadTableOptions {
	id?: string | number;
	fields?: string[];
	where?: string;
	order?: string;
	page?: number;
	limit?: number;
	cacheTime?: number;
}
