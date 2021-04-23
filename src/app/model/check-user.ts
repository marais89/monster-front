export class CheckUser {

  isValidUser: boolean;
  errorType: CheckUserErrorType;
}

export enum CheckUserErrorType {

  USER_NOT_FOUND= "USER_NOT_FOUND",
  BLOCKED_USER= "BLOCKED_USER",
  DESABLED_USER= "DESABLED_USER",
  TECHNICOL_ERROR= "TECHNICOL_ERROR",
  SEND_NOTIF_ERROR = "SEND_NOTIF_ERROR "
}
