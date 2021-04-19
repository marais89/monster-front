import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {UrlUtils} from '../../utils/url-utils';
import {UpdatePassword} from '../../model/update-password';
import {User} from '../../login/login.component';
import {BrowserUtils} from '../../utils/browser-utils';

@Injectable()
export class AuthentApiService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }


  updatePwd(oldPwd: string, newPwd: string): Observable<User> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDATE_PWD;
    let request = this.buildUpdatePwdRequestContext(oldPwd, newPwd);
    return this.http.post<User>(url, request, this.buildHeader());
  };


  private buildUpdatePwdRequestContext(oldPwd: string, newPwd: string): UpdatePassword {
    let updatePassword = new UpdatePassword();
    updatePassword.oldPwd = oldPwd;
    updatePassword.newPwd = newPwd;
    updatePassword.requestContext = BrowserUtils.buildRequestContext();
    return updatePassword;
  }

}
