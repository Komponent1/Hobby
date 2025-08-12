/* eslint-disable max-classes-per-file */
import { ErrorType } from '../store/reservation.store.error';

export class ApiException extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
  }
}
export class UnAuthorizedException extends ApiException {
  constructor() {
    super(401, ErrorType.UnAuthorized);
  }
}
export class UnknownException extends ApiException {
  constructor() {
    super(500, ErrorType.Unknown);
  }
}
