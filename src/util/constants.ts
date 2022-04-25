import { CorsOptions, CorsOptionsDelegate } from 'cors';

export const DEFAULT_CORSOPTIONS: CorsOptions | CorsOptionsDelegate = {
	origin: '*',
	optionsSuccessStatus: 200,
};

export const IMAGE_MIME_TYPE = [
	'image/bmp',
	'image/cis-cod',
	'image/gif',
	'image/ief',
	'image/jpeg',
	'image/jpeg',
	'image/jpeg',
	'image/pipeg',
	'image/svg+xml',
	'image/tiff',
	'image/tiff',
	'image/x-cmu-raster',
	'image/x-cmx',
	'image/x-icon',
	'image/x-portable-anymap',
	'image/x-portable-bitmap',
	'image/x-portable-graymap',
	'image/x-portable-pixmap',
	'image/x-rgb',
	'image/x-xbitmap',
	'image/x-xpixmap',
	'image/x-xwindowdump',
];

export const VIDEO_MIME_TYPE = [
	'video/mpeg',
	'video/mpeg',
	'video/mpeg',
	'video/mpeg',
	'video/mpeg',
	'video/mpeg',
	'video/mp4',
	'video/quicktime',
	'video/quicktime',
	'video/x-la-asf',
	'video/x-la-asf',
	'video/x-ms-asf',
	'video/x-ms-asf',
	'video/x-ms-asf',
	'video/x-msvideo',
	'video/x-sgi-movie',
];
