/**
 * Parse the params of the uri
 * @param {string} uri
 * @param {string} route
 * @returns {Map<string, string>}
 */
export default function parseParam(
  uri: string,
  route: string,
): Map<string, string> {
  const uriSegments: string[] = uri.split('/').slice(1);
  const routeSegments: string[] = route.split('/').slice(1);

  // find the indexes of the params
  const idxs: number[] = uriSegments
    .map((item: string, idx: number) => (item[0] === ':' ? idx : undefined))
    .filter((item: number | undefined) => item !== undefined);

  return idxs.reduce<Map<string, string>>(
    (acc: Map<string, string>, curr: number) => {
      const key: string = routeSegments[curr].slice(1);
      const value: string = uriSegments[curr];
      acc.set(key, value);
      return acc;
    },
    new Map(),
  );
}
