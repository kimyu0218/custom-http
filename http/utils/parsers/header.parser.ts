import { COOKIE_SEP, HEADER } from '../regexp';

/**
 * Parse the cookies of the HTTP request
 * @param {string} cookieValue - the value of the "Cookies" header
 * @returns {Map<string, string>}
 */
export function parseCookies(cookieValue: string): Map<string, string> {
  const cookies: string[] = cookieValue.split(COOKIE_SEP);
  return cookies.reduce<Map<string, string>>(
    (acc: Map<string, string>, curr: string) => {
      const [key, value]: string[] = curr.split('=');
      if (value) {
        acc.set(key, value);
      }
      return acc;
    },
    new Map(),
  );
}

/**
 * Parse the header of the HTTP request
 * @param {string} header
 * @returns {Map<string, string>}
 */
export function parseHeader(header: string): Map<string, string> {
  return header
    .split('\n')
    .reduce<Map<string, string>>((acc: Map<string, string>, curr: string) => {
      const match: RegExpExecArray = HEADER.exec(curr);
      if (match) {
        const { fieldName, fieldValue } = match.groups;
        acc.set(fieldName, fieldValue.trim());
      }
      return acc;
    }, new Map());
}
