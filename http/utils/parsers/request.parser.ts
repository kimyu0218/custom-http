import {
  CRLF,
  HttpMethods,
  METHODS,
  SP,
  X_WWW_FORM_URLENCODED,
} from '../../constants';
import { ParsedRequest, ParsedRequestLine } from '../../interfaces';
import { EMPTY_LINE, NEW_LINE, REQUEST_LINE } from '../regexp';
import { parseCookies, parseHeader } from './header.parser';
import parseQuery from './query.parser';

/**
 * Parse the HTTP request message
 * @param {string} request
 * @returns {ParsedRequest}
 */
export default function parseRequest(request: string): ParsedRequest {
  // parse request-line
  const requestLine: string = request.split(NEW_LINE).at(0) + CRLF;
  const { method, uri, version } = parseRequestLine(requestLine);
  if (!method || !uri || !version) {
    throw new Error('Invalid start-line');
  }

  const [headerStr, bodyStr]: string[] = request
    .replace(requestLine, '')
    .split(EMPTY_LINE);

  // parse header
  const header: Map<string, string> = parseHeader(headerStr);

  // parse cookies
  const cookieValue: string = header.get('Cookies');
  const cookies: Map<string, string> = cookieValue
    ? parseCookies(cookieValue)
    : new Map();

  // GET request
  if (method === METHODS.GET) {
    const [path, queryString] = uri.split('?');
    const query: Map<string, string> = queryString // parse query string
      ? parseQuery(queryString)
      : new Map();
    return { method, path: path, version, cookies, query };
  }

  // x-www-form-urlencoded
  const contentType: string = header.get('Content-Type');
  if (contentType === X_WWW_FORM_URLENCODED) {
    const body: Map<string, string> = parseQuery(
      decodeURIComponent(bodyStr?.replace(/\+/g, ' ') ?? ''),
    );
    return { method, path: uri, version, cookies, query: undefined, body };
  }

  const body: any = JSON.parse(bodyStr ?? '');
  return { method, path: uri, version, cookies, query: undefined, body };
}

/**
 * Parse the request-line of HTTP request
 * @param {string} requestLine
 * @returns {ParsedRequestLine}
 */
function parseRequestLine(requestLine: string): ParsedRequestLine {
  if (!isValidRequestline(requestLine)) {
    return {};
  }
  const splits: string[] = requestLine.split(SP).map((s) => s.replace('#', '')); // remove fragment
  return {
    method: splits.at(0) as HttpMethods,
    uri: splits.at(1),
    version: splits.at(2),
  };
}

/**
 * Check if the request-line is valid
 * @param {string} requestLine
 * @returns {boolean}
 */
function isValidRequestline(requestLine: string): boolean {
  return REQUEST_LINE.test(requestLine);
}
