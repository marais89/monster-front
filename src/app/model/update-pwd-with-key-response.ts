export class UpdatePwdWithKeyResponse {

  response: Responsetype;
}

export enum Responsetype {

  OK = 'OK',
  EXPIRED_KEY = 'EXPIRED_KEY',
  NOT_VALID_KEY = 'NOT_VALID_KEY',
  ERROR = 'ERROR '
}
