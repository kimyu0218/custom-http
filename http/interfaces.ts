import { HttpMethods } from './constants';

export interface ParsedRequestLine {
  method?: HttpMethods;
  path?: string;
  version?: string;
}

export interface ParsedRequest {
  method: string;
  path: string;
  version: string;
  cookies?: Record<string, string>;
  query?: Record<string, string>;
  body?: Record<string, string>;
}
