import { CRLF, SP } from './constants';
import RegExpBuilder from './utils/builders/regexp.builder';

const METHODS: string = 'GET|HEAD|PUT|POST|PATCH|DELETE|TRACE|OPTIONS';
export const NEWLINE: RegExp = /\r\n/g;
export const EMPTY_LINE: RegExp = /\r\n\r\n/;
export const BLANK: RegExp = /\s/;
export const COOKIE_SEP: RegExp = /; /g;
export const X_WWW_FORM_URLENCODED: RegExp = /^x-www-form-urlencoded$/;

// Request-Line: Method SP Request-URI SP HTTP-Version (CRLF)
export const REQUEST_LINE: RegExp = new RegExpBuilder(`^(${METHODS})`) // Method
  .add(SP)
  .add('/[^ ]*') // Request-URI
  .add(SP)
  .add('HTTP/(0.9|1.0|2|3)$') // HTTP-Version
  .build();

export const COOKIE: RegExp = new RegExpBuilder(CRLF)
  .add('Cookie:')
  .add(
    `(?<cookies>[^=;${CRLF}]+=[^=;${CRLF}]+(;${SP}[^=${CRLF}]+=[^=${CRLF}]+)*)`,
  )
  .add(CRLF)
  .build();

export const CONTENT_TYPE: RegExp = new RegExpBuilder(CRLF)
  .add('Content-Type:')
  .add(`application/(?<contentType>[^${CRLF}]+)`)
  .add(CRLF)
  .build();
