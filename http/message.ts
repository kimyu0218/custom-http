export default class HttpMessage {
  private startLine?: string;
  private version?: string;
  private header: Record<string, string> = {};
  private messageBody: any;

  getStartLine(): string | null {
    return this.startLine ?? null;
  }

  getVersion(): string | null {
    return this.version ?? null;
  }

  getHeader(): Record<string, string> {
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
    this.header[key] = value;
    return this;
  }

  setMessageBody(body: any): this {
    this.messageBody = body;
    return this;
  }
}
