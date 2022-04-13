import bcrypt from 'bcrypt';

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

export const clearTimestamp = (data: any) => {
	Reflect.deleteProperty(data, 'createdAt');
	Reflect.deleteProperty(data, 'updatedAt');

	return data;
};

export const stringfy = (...data: any[]) => data.map(item => item.toString()).join(' ');
export const convertToJson = (data: string) => JSON.parse(data);
export const clearTimestampFileds = (data: any) => {
	Reflect.deleteProperty(data, 'createdAt');
	Reflect.deleteProperty(data, 'updatedAt');

	return data;
};

export const setfieldtoDate = (field?: string | Date | number) => (field ? new Date(field) : undefined);
