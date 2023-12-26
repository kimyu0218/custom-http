export default class HttpMessage {
  private startLine?: string;
  private version?: string;
  private header: Map<string, string> = new Map();
  private messageBody: any;

  getStartLine(): string {
    return this.startLine ?? null;
  }

  getVersion(): string {
    return this.version ?? null;
  }

  getHeader(key: string): string {
    return this.header.get(key) ?? null;
  }

  getHeaders(): Map<string, string> {
    return this.header;
  }

  getMessageBody(): any {
    return this.messageBody;
  }

  setStartLine(startLine: string): this {
    this.startLine = startLine;
    return this;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.header.set(key, value);
    return this;
  }

  setMessageBody(body: any): this {
    this.messageBody = body;
    return this;
  }
}
