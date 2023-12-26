import HttpMessage from './message';
import parseRequest from './utils/parsers/request.parser';

export class HttpRequest extends HttpMessage {
  private method: string;
  private path: string;
  private query: Map<string, string> = new Map();
  private cookies: Map<string, string> = new Map();
  private params: Map<string, string> = new Map();

  constructor(data: string) {
    super();
    const { method, path, version, cookies, query, body } = parseRequest(data);
    this.method = method;
    this.path = path;
    this.setVersion(version);
    this.cookies = cookies;
    this.query = query;
    if (body) {
      this.setMessageBody(body);
    }
  }

  getMethod(): string {
    return this.method;
  }

  getPath(): string {
    return this.path;
  }

  getQuery(): Map<string, string> {
    return this.query;
  }

  getCookie(key: string): string {
    return this.cookies.get(key) ?? null;
  }

  getParam(key: string): string {
    return this.params.get(key) ?? null;
  }

  setParam(key: string, value: string): HttpRequest {
    this.params.set(key, value);
    return this;
  }
}
