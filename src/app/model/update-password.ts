import {RequestContext} from './request-context';

export class UpdatePassword {

    login : string;
    oldPwd : string;
    newPwd : string;
    requestContext: RequestContext;
}
