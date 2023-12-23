import HttpMessage from './message';
import parseRequest from './utils/parsers/request.parser';

export class HttpRequest extends HttpMessage {
  private method: string;
  private path: string;
  private query?: Record<string, string>;
  private cookies?: Record<string, string>;
  private params: Map<string, string> = new Map();

  constructor(data: string) {
    super();
    try {
      const { method, path, version, cookies, query, body } =
        parseRequest(data);
      this.method = method;
      this.path = path;
      this.setVersion(version);
      this.cookies = cookies;
      this.query = query;
      if (body) {
        this.setMessageBody(body);
      }
    } catch (err: unknown) {
      /**
       * error handling
       */
    }
  }

  getCookie(name: string): string | null {
    return this.cookies?.[name] ?? null;
  }

  getMethod(): string {
    return this.method;
  }

  getPath(): string {
    return this.path;
  }

  getQuery(): Record<string, string> | null {
    return this.query ?? null;
  }

  getCookies(): Record<string, string> | null {
    return this.cookies ?? null;
  }

  setParams(key: string, value: string): HttpRequest {
    this.params.set(key, value);
    return this;
  }
}
