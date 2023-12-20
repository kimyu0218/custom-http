import { STARTLINE } from './regexp';

export function isValidStartline(startLine: string): boolean {
  return STARTLINE.test(startLine);
}
