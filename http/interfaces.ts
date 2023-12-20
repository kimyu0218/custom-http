import { HttpMethods } from './constants';

export interface ParsedStartLine {
  method?: HttpMethods;
  path?: string;
  version?: string;
}

export interface ParsedMessage {
  method: string;
  path: string;
  version: string;
  cookies?: Record<string, string>;
  query?: Record<string, string>;
  body?: Record<string, string>;
}
