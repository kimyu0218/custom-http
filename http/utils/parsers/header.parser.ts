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
  return Array.from(header.matchAll(HEADER)).reduce<Map<string, string>>(
    (acc: Map<string, string>, curr: string[]) => {
      const [fieldName, fieldValue]: string[] = curr;
      acc.set(fieldName, fieldValue);
      return acc;
    },
    new Map(),
  );
}
