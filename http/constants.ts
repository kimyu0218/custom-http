export type HttpMethods =
  | 'GET'
  | 'HEAD'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE'
  | 'TRACE'
  | 'OPTIONS';

type ContentType =
  | 'text/html'
  | 'text/css'
  | 'text/javascript'
  | 'image/x-icon'
  | 'image/png'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'application/json';

type FileExtension =
  | 'HTML'
  | 'CSS'
  | 'JS'
  | 'ICO'
  | 'PNG'
  | 'JPG'
  | 'SVG'
  | 'JSON';

export const METHODS: Record<HttpMethods, HttpMethods> = {
  GET: 'GET',
  HEAD: 'HEAD',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  OPTIONS: 'OPTIONS',
};

export const CONTENT_TYPE: Record<FileExtension, ContentType> = {
  HTML: 'text/html',
  CSS: 'text/css',
  JS: 'text/javascript',
  ICO: 'image/x-icon',
  PNG: 'image/png',
  JPG: 'image/jpeg',
  SVG: 'image/svg+xml',
  JSON: 'application/json',
};

export const STATUS_CODES: Record<number, string> = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  409: 'Conflict',
  429: 'Too Many Requests',
  500: 'Internal Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

export const CRLF: string = '\r\n';
