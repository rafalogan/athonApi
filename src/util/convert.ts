import bcrypt from 'bcrypt';
import { FileEntity } from 'src/repositories/types';
import { FileMedia } from 'src/repositories/entities';

export const snakeToCamel = (field: string): string => {
	let toArray = field.split('_');
	toArray = toArray.map((word, index) => {
		if (index >= 1) return word.charAt(0).toUpperCase() + word.slice(1);
		return word;
	});

	return toArray.join('');
};

export const camelToSnake = (field: string): string => {
	return field
		.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.join('_')
		.toLowerCase();
};

export const convertDataValues = (data: any) => {
	const keys = Object.keys(data);
	const values = Object.values(data);
	const convertKeysToSnake = keys.map(camelToSnake);
	const result: any = {};

	convertKeysToSnake.forEach((key, i) => (result[key] = values[i]));

	return result;
};

export const hashString = (field: string, salt: number) => bcrypt.hashSync(field, salt);

export const stringify = (...data: any[]) => data.map(item => item.toString()).join(' ');

export const convertToJson = (data: string) => JSON.parse(data);

export const clearTimestampFields = (data: any) => {
	Reflect.deleteProperty(data, 'createdAt');
	Reflect.deleteProperty(data, 'updatedAt');

	return data;
};

export const setFieldToDate = (field?: string | Date | number) => (field ? new Date(field) : undefined);

export const deleteField = (data: any, field: string) => {
	Reflect.deleteProperty(data, field);

	return data;
};

export const setTimestampFields = (data?: Date | string | number) => (data ? new Date(data) : undefined);

export const setFilesMeda = (data?: FileEntity[] | FileMedia[]) =>
	data ? data.map(file => (file instanceof FileMedia ? file : new FileMedia(file))) : [];
