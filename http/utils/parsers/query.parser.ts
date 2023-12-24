/**
 * Parse the query string
 * @param {string} queryString
 * @returns {Map<string, string>}
 */
export default function parseQuery(queryString: string): Map<string, string> {
  const query: string[] = queryString.split('&');
  return query.reduce<Map<string, string>>(
    (acc: Map<string, string>, curr: string) => {
      const [key, value] = curr.split('=');
      acc.set(key, value);
      return acc;
    },
    new Map(),
  );
}
