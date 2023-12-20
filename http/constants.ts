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

export const METHODS: { [key in HttpMethods]: HttpMethods } = {
  GET: 'GET',
  HEAD: 'HEAD',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  OPTIONS: 'OPTIONS',
};

export const CONTENT_TYPE: { [key: string]: ContentType } = {
  HTML: 'text/html',
  CSS: 'text/css',
  JS: 'text/javascript',
  ICO: 'image/x-icon',
  PNG: 'image/png',
  JPG: 'image/jpeg',
  SVG: 'image/svg+xml',
  JSON: 'application/json',
};

export const STATUS_CODES: { [key: number]: string } = {
  200: 'OK',
  201: 'Created',
  302: 'Found',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Error',
};

export const CRLF: string = '\r\n';
