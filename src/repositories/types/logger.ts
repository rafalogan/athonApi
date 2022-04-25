import {
	ConsoleTransportInstance,
	FileTransportInstance,
	HttpTransportInstance,
	StreamTransportInstance,
} from 'winston/lib/winston/transports';
import * as Transport from 'winston-transport';
import { Agent } from 'http';

export interface Transports {
	FileTransportOptions: FileTransportOptions;
	File: FileTransportInstance;
	ConsoleTransportOptions: ConsoleTransportOptions;
	Console: ConsoleTransportInstance;
	HttpTransportOptions: HttpTransportOptions;
	Http: HttpTransportInstance;
	StreamTransportOptions: StreamTransportOptions;
	Stream: StreamTransportInstance;
}

interface ConsoleTransportOptions extends Transport.TransportStreamOptions {
	consoleWarnLevels?: string[];
	stderrLevels?: string[];
	debugStdout?: boolean;
	eol?: string;
}

interface FileTransportOptions extends Transport.TransportStreamOptions {
	filename?: string;
	dirname?: string;
	options?: object;
	maxsize?: number;
	stream?: NodeJS.WritableStream;
	rotationFormat?: Function;
	zippedArchive?: boolean;
	maxFiles?: number;
	eol?: string;
	tailable?: boolean;
}

interface HttpTransportOptions extends Transport.TransportStreamOptions {
	ssl?: any;
	host?: string;
	port?: number;
	auth?: { username?: string | undefined; password?: string | undefined; bearer?: string | undefined };
	path?: string;
	agent?: Agent;
	headers?: object;
	batch?: boolean;
	batchInterval?: number;
	batchCount?: number;
}

interface StreamTransportOptions extends Transport.TransportStreamOptions {
	stream: NodeJS.WritableStream;
	eol?: string;
}
