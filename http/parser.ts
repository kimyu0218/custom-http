import { HttpMethods, METHODS } from './constants';
import { ParsedMessage, ParsedStartLine } from './interfaces';
import {
  BLANK,
  CONTENT_TYPE,
  COOKIE,
  COOKIE_SEP,
  EMPTY_LINE,
  NEWLINE,
  X_WWW_FORM_URLENCODED,
} from './regexp';
import { isValidStartline } from './valid-check';

/**
 * Parse start-line of http request
 * @param {string} startLine
 * @returns {ParsedStartLine}
 */
function parseStartLine(startLine: string): ParsedStartLine {
  if (!isValidStartline(startLine)) {
    return {};
  }
  const splits: string[] = startLine
    .split(BLANK)
    .map((s) => s.replace('#', '')); // remove fragment
  return {
    method: splits.at(0) as HttpMethods,
    path: splits.at(1),
    version: splits.at(2),
  };
}

/**
 * Parse cookies of http request
 * @param {string} message
 * @returns {Record<string, string>}
 */
function parseCookies(message: string): Record<string, string> {
  const match: RegExpMatchArray | null = message.match(COOKIE);
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
 * Parse http message
 * @param {string} message
 * @returns {ParsedMessage}
 */
export default function parseMessage(message: string): ParsedMessage {
  // parse start-line
  const startLine: string | undefined = message.split(NEWLINE).at(0);
  const { method, path, version } = parseStartLine(startLine ?? '');
  if (!method || !path || !version) {
    throw new Error('Invalid start-line');
  }

  // parse cookies
  const cookies: Record<string, string> = parseCookies(message);

  // GET request
  if (method === METHODS.GET) {
    const [realPath, queryString] = path.split('?');
    const query: Record<string, string> = queryString // parse query string
      ? parseQuery(queryString)
      : {};
    return { method, path: realPath, version, cookies, query };
  }

  const lastLine: string | undefined = message.split(EMPTY_LINE).at(-1);
  const contentTypeMatch: RegExpMatchArray | null = message.match(CONTENT_TYPE);

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
