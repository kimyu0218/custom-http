import { CustomError } from './custom-error';

export class InvalidRequestLineError extends CustomError {
  constructor() {
    super(400, 'Invalid Request line');
  }
}
