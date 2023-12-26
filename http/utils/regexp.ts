import { CRLF, SP } from '../constants';
import RegExpBuilder from './builders/regexp.builder';

const METHODS: string = 'GET|HEAD|PUT|POST|PATCH|DELETE|TRACE|OPTIONS';
const VERSIONS: string = '0.9|1.0|1.1|2|3';

export const NEW_LINE: RegExp = /\r\n/g;
export const EMPTY_LINE: RegExp = /\r\n\r\n/;
export const COOKIE_SEP: RegExp = /; /g;

// Request-Line: Method SP Request-URI SP HTTP-Version CRLF
export const REQUEST_LINE: RegExp = new RegExpBuilder(`^(${METHODS})`) // Method
  .add(SP)
  .add('/[^ ]*') // Request-URI
  .add(SP)
  .add(`HTTP/(${VERSIONS})`) // HTTP-Version
  .add(CRLF)
  .build();

// Message Headers: field-name: field-value
export const HEADER: RegExp = new RegExpBuilder(`^(?<fieldName>[\\w-]+):`) // field-name
  .add(SP)
  .add('(?<fieldValue>[^\r\n]+)') // field-value
  .build();
