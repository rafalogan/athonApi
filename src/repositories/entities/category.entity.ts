import { CategoryEntity } from 'src/repositories/types/category';

export class Category implements CategoryEntity {
	id?: number;
	name: string;
	description: string;
	url: string;
	status: boolean;
	parentId?: number;
	userId: number;
	subCategories?: Category[];
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: CategoryEntity, id?: number, userId?: number) {
		this.id = Number(id ?? props?.id);
		this.name = props.name;
		this.description = props.description;
		this.url = props.url;
		this.status = props.status;
		this.parentId = Number(props.parentId);
		this.userId = Number(props.userId ?? userId);
		this.subCategories = this.setSubCategories(props?.subCategories);
		this.createdAt = props?.createdAt ? new Date(props?.createdAt) : undefined;
		this.updatedAt = props?.updatedAt ? new Date(props?.updatedAt) : undefined;
	}

	setSubCategories(subCategories?: Category[] | CategoryEntity[]) {
		return subCategories
			? subCategories.map(subCategory => (subCategory instanceof Category ? subCategory : new Category(subCategory)))
			: undefined;
	}
}
