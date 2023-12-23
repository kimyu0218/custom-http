import { HttpMethods, METHODS } from '../../constants';
import { ParsedRequest, ParsedRequestLine } from '../../interfaces';
import {
  BLANK,
  CONTENT_TYPE,
  COOKIE,
  COOKIE_SEP,
  EMPTY_LINE,
  NEWLINE,
  REQUEST_LINE,
  X_WWW_FORM_URLENCODED,
} from '../../regexp';

/**
 * Parse the HTTP request message
 * @param {string} request
 * @returns {ParsedRequest}
 */
export default function parseRequest(request: string): ParsedRequest {
  // parse request-line
  const requestLine: string | undefined = request.split(NEWLINE).at(0);
  const { method, path, version } = parseRequestLine(requestLine ?? '');
  if (!method || !path || !version) {
    throw new Error('Invalid start-line');
  }

  // parse cookies
  const cookies: Record<string, string> = parseCookies(request);

  // GET request
  if (method === METHODS.GET) {
    const [realPath, queryString] = path.split('?');
    const query: Record<string, string> = queryString // parse query string
      ? parseQuery(queryString)
      : {};
    return { method, path: realPath, version, cookies, query };
  }

  const lastLine: string | undefined = request.split(EMPTY_LINE).at(-1);
  const contentTypeMatch: RegExpMatchArray | null = request.match(CONTENT_TYPE);

  if (contentTypeMatch) {
    const contentType: string | undefined =
      contentTypeMatch.groups?.contentType;
    // x-www-form-urlencoded
    if (contentType && X_WWW_FORM_URLENCODED.test(contentType)) {
      const body: Record<string, string> | undefined = parseQuery(
        decodeURIComponent(lastLine?.replace(/\+/g, ' ') ?? ''),
      );
      return { method, path, version, cookies, query: undefined, body };
    }
  }
  const body: any = JSON.parse(lastLine ?? '');
  return { method, path, version, cookies, query: undefined, body };
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
  const splits: string[] = requestLine
    .split(BLANK)
    .map((s) => s.replace('#', '')); // remove fragment
  return {
    method: splits.at(0) as HttpMethods,
    path: splits.at(1),
    version: splits.at(2),
  };
}

/**
 * Parse the cookies of the HTTP request
 * @param {string} request
 * @returns {Record<string, string>}
 */
function parseCookies(request: string): Record<string, string> {
  const match: RegExpMatchArray | null = request.match(COOKIE);
  if (!match) {
    return {};
  }
  const cookieStr: string[] | undefined =
    match.groups?.cookies.split(COOKIE_SEP);
  return !cookieStr
    ? {}
    : cookieStr.reduce<Record<string, string>>(
        (acc: Record<string, string>, curr: string) => {
          const [key, value]: string[] = curr.split('=');
          acc[key] = value;
          return acc;
        },
        {},
      );
}

/**
 * Parse query string of path
 * @param {string} queryString
 * @returns {Record<string, string>}
 */
function parseQuery(queryString: string): Record<string, string> {
  if (!queryString) {
    return {};
  }
  const query: string[] = queryString.split('&');
  return query.reduce<Record<string, string>>(
    (acc: Record<string, string>, curr: string) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    },
    {},
  );
}

/**
 * Check if the HTTP request-line is valid
 * @param {string} requestLine
 * @returns {boolean}
 */
function isValidRequestline(requestLine: string): boolean {
  return REQUEST_LINE.test(requestLine);
}
