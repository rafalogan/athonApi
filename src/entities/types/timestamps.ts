export interface Timestampsfileds extends CreatedAtField, UpdatedAtField {}

export interface CreatedAtField {
	createdAt?: Date;
}

export interface UpdatedAtField {
	updatedAt?: Date;
}
