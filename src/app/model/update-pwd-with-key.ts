import {RequestContext} from './request-context';

export class UpdatePwdWithKey {
  key: string;
  newPassword: string;
  requestContext: RequestContext;
}
