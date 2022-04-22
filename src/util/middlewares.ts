import { randomBytes } from 'crypto';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';
import { env } from 'src/server';
import { CustomFile } from 'src/repositories/types';

const { bucket } = env.aws;
const dest = './tmp/uploads';

const storageTypes = {
	local: multer.diskStorage({
		destination: (req, file, cb) => cb(null, dest),
		filename: (req, file: CustomFile, cb: any) =>
			randomBytes(16, (err, hash) => {
				if (err) return cb(err);
				file.key = `${hash.toString('hex')}-${file.originalname}`;
				cb(null, file.key);
			}),
	}),

	s3: multerS3({
		s3: new S3(),
		bucket,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
		key: (req, file, cb) => randomBytes(16, (err, hash) => (err ? cb(err) : cb(null, `${hash.toString('hex')}-${file.originalname}`))),
	}),
};

export const upload = multer({ dest, storage: storageTypes['local'] });
