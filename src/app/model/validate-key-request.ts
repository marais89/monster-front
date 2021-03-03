import {RequestContext} from './request-context';

export class ValidateKeyRequest {

  username: string;
  key: string;
  requestContext: RequestContext;
}
