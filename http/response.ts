import { Socket } from 'net';
import { CONTENT_TYPE, CRLF, SP, STATUS_CODES } from './constants';
import HttpMessage from './message';
import StringBuilder from './utils/builders/string.builder';

export class HttpResponse extends HttpMessage {
  private readonly socket: Socket;
  private statusCode: number = 200;
  private statusMessage: string = STATUS_CODES[200];

  constructor(socket: Socket, version: string) {
    super();
    this.setVersion(version);
    this.socket = socket;
  }

  /**
   * Send the HTTP resposne to the client
   */
  send(): void {
    this.socket.write(this.getMessage());
    this.socket.end();
  }

  /**
   * Throw an HTTP error with the specified status code and optional message
   * @param {number} statusCode
   * @param {string} [message]
   * @returns {HttpResponse}
   */
  throwError(statusCode: number, message?: string): HttpResponse {
    this.statusCode = statusCode;
    this.statusMessage = STATUS_CODES[statusCode];
    this.setMessageBody(message ? message : this.statusMessage);
    this.setHeader('Content-Type', `${CONTENT_TYPE.HTML}; charset=utf-8`);
    return this;
  }

  /**
   * Get the complete HTTP response message
   * @returns {string}
   */
  getMessage(): string {
    this.setStartLine(this.makeStatusLine());
    const contentType: string = this.getHeader('Content-Type');

    // JSON to String
    const messageBody: any =
      contentType === CONTENT_TYPE.JSON
        ? JSON.stringify(this.getMessageBody())
        : this.getMessageBody();

    return new StringBuilder(this.getStartLine()) // status-line
      .add(CRLF)
      .add(this.makeHeader()) // header
      .add(CRLF)
      .add(messageBody) // message-body
      .build();
  }

  setStatusCode(statusCode: number): HttpResponse {
    this.statusCode = statusCode;
    this.statusMessage = STATUS_CODES[statusCode];
    return this;
  }

  setStatusMessage(message: string): HttpMessage {
    this.statusMessage = message;
    return this;
  }

  /**
   * Make the status-line for the HTTP response
   *
   * HTTP-Version SP Status-Code SP Reason-Phrase (CRLF)
   * @returns {string}
   */
  private makeStatusLine(): string {
    return new StringBuilder(this.getVersion()) // HTTP-Version
      .add(SP)
      .add(this.statusCode.toString()) // Status-Code
      .add(SP)
      .add(this.statusMessage) // Reason-Phrase
      .build();
  }

  /**
   * Make the header section of the HTTP response
   * @returns {string}
   */
  private makeHeader(): string {
    const header: Map<string, string> = this.getHeaders();
    return Object.entries(header).reduce(
      (acc: string, [key, value]: string[]) => acc + `${key}:${value}${CRLF}`,
      '',
    );
  }
}
