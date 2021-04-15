import path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');
const alias = {
	src: path.join(files, 'src'),
	test: path.join(files, 'test'),
};

moduleAlias.addAliases(alias);
