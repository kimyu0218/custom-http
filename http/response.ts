import net from 'net';
import { CONTENT_TYPE, CRLF, STATUS_CODES } from './constants';
import HttpMessage from './message';

export class HttpResponse extends HttpMessage {
  private readonly socket: net.Socket;
  private statusCode: number = 200;
  private statusMessage: string = STATUS_CODES[200];

  constructor(socket: net.Socket) {
    super();
    this.socket = socket;
  }

  getMessage(): string {
    this.setStartLine(this.makeStartLine());
    return `${this.getStartLine()}${CRLF}${this.makeHeader()}${CRLF}${this.getMessageBody()}`;
  }

  setStatusCode(statusCode: number): HttpResponse {
    this.statusCode = statusCode;
    this.statusMessage = STATUS_CODES[statusCode];
    return this;
  }

  setMessageBody(body: any): HttpResponse {
    this.setMessageBody(body);
    return this;
  }

  setStatusMessage(message: string): HttpMessage {
    this.statusMessage = message;
    return this;
  }

  send(): void {
    this.socket.write(this.getMessage());
    this.socket.end();
  }

  throwError(statusCode: number, message?: string): HttpResponse {
    this.statusCode = statusCode;
    this.statusMessage = STATUS_CODES[statusCode];
    this.setMessageBody(message ? message : this.statusMessage);
    this.setHeader('Content-Type', `${CONTENT_TYPE.HTML}; charset=utf-8`);
    return this;
  }

  private makeStartLine(): string {
    return `HTTP/${this.getVersion()} ${this.statusCode} ${this.statusMessage}`;
  }

  private makeHeader(): string {
    const header: Record<string, string> = this.getHeader();
    let result = '';
    for (const key in header) {
      result += `${key}: ${header[key]}${CRLF}`;
    }
    return result;
  }
}
