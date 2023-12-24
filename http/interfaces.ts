import { HttpMethods } from './constants';

export interface ParsedRequestLine {
  method?: HttpMethods;
  uri?: string;
  version?: string;
}

export interface ParsedRequest {
  method: string;
  path: string;
  version: string;
  cookies?: Map<string, string>;
  query?: Map<string, string>;
  body?: any;
}
