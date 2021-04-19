export class LoginResponse {

  isValidCredentials: boolean;
  isUserActive: boolean;
  accessToken: string;
  failedTentativeCount: number;
}
