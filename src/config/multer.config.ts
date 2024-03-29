import multer, { diskStorage, Multer } from 'multer';
import multerS3 from 'multer-s3';
import { randomBytes } from 'crypto';

import { CustomFile, IAWSEnvironment, S3Storage } from 'src/repositories/types';
import { S3 } from 'aws-sdk';

export class MulterConfig {
	private readonly dest: string;
	private readonly _upload: Multer;

	constructor(private awsConfig: IAWSEnvironment) {
		this.dest = './tmp/uploads';
		this._upload = this.awsConfig.storageType === 's3' ? this.setS3Storage() : this.setLocalStorage();
	}

	get upload(): Multer {
		return this._upload;
	}

	setLocalStorage() {
		const storage = diskStorage({
			destination: (req, file, cb) => cb(null, this.dest),
			filename: (req, file: CustomFile, cb: any) =>
				randomBytes(16, (err, hash) => {
					if (err) return cb(err);
					file.key = `${hash.toString('hex')}-${file.originalname}`;
					cb(null, file.key);
				}),
		});

		return multer({ dest: this.dest, storage });
	}

	setS3Storage() {
		const { bucket } = this.awsConfig;
		const storage = multerS3({
			s3: new S3(),
			bucket,
			contentType: multerS3.AUTO_CONTENT_TYPE,
			acl: 'public-read',
			metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
			key: (req, file, cb) => randomBytes(16, (err, hash) => (err ? cb(err) : cb(null, `${hash.toString('hex')}-${file.originalname}`))),
		});

		return multer({ dest: this.dest, storage });
	}
}
