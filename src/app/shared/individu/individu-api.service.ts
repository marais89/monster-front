import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Individu} from '../../model/individu';
import {UrlUtils} from '../../utils/url-utils';
import {User} from '../../login/login.component';
import {CookiesUtils} from '../../utils/cookies-utils';
import {IndividuGlobaleInfos} from '../../model/individu-globale-infos';
import {SavingResponse} from '../../model/saving_response';
import {Adress} from '../../model/adress';
import {Town} from '../../model/town';
import {BrowserUtils} from '../../utils/browser-utils';
import {IndividuRequest} from '../../model/individu-request';
import {UpdateStatusRequest} from '../../model/update-status-request';
import {ValidateKeyRequest} from '../../model/validate-key-request';
import {LoginRequest} from '../../model/login-request';
import {LoginResponse} from '../../model/login-response';
import {CheckUser} from '../../model/check-user';
import {UpdatePwdWithKeyResponse} from '../../model/update-pwd-with-key-response';
import {UpdatePwdWithKey} from '../../model/update-pwd-with-key';

@Injectable()
export class IndividuApiService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  private buildStandardHeader() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  getAll(): Observable<Individu[]> {
    return this.http.get<Individu[]>(UrlUtils.BASE_URL + UrlUtils.INDIVIDUS_URL, this.buildHeader());
  }


  saveIndividu(individu: Individu): Observable<SavingResponse> {
    let url = UrlUtils.BASE_URL + UrlUtils.CREATE_URL;
    let individuRequest = this.buildIndividuRequest(individu);
    individuRequest.requestContext.username = individu.username;
    return this.http.post<SavingResponse>(url, individuRequest, this.buildStandardHeader());
  };

  updateIndividu(individu: Individu): Observable<Individu> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDATE_URL;
    let individuRequest = this.buildIndividuRequest(individu);
    return this.http.post<Individu>(url, individuRequest, this.buildHeader());
  };

  SuspendUser(username: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.SUSPEND_URL + username;
    return this.http.post<Individu[]>(url, this.buildUpdateRequestContext(username), this.buildHeader());
  };

  resumeUser(username: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.RESUME_URL + username;
    return this.http.post<Individu[]>(url, this.buildUpdateRequestContext(username), this.buildHeader());
  };

  deactivateUser(username: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.DEACTIVATE_URL + username;
    return this.http.post<Individu[]>(url, this.buildUpdateRequestContext(username), this.buildHeader());
  };

  verifyKey(username: string, key: string): Observable<boolean> {
    let url = UrlUtils.BASE_URL + '/individus/username/' + username + '/key/validate';
    let validationkeyRequest: ValidateKeyRequest = this.buildValidationKeyRequest(username, key);
    return this.http.post<boolean>(url, validationkeyRequest, this.buildHeader());
  };

  retrieveIndividu(username: string): Observable<IndividuGlobaleInfos> {
    let url = UrlUtils.BASE_URL + UrlUtils.RETRIEVE_INDIVIDU_URL + username;
    return this.http.get<IndividuGlobaleInfos>(url, this.buildHeader());
  }

  checkUserByEmail(email: string): Observable<CheckUser> {
    let url = UrlUtils.BASE_URL + UrlUtils.CHECK_BY_EMAIL_INDIVIDU_URL;
    return this.http.post<CheckUser>(url, this.buildCheckEmailRequest(email));
  }

  updatePwdWithKey(updatePwdWithKey: UpdatePwdWithKey): Observable<UpdatePwdWithKeyResponse> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDAT_PWD_WITH_KEY_URL;
    updatePwdWithKey.requestContext = BrowserUtils.buildRequestContext();
    return this.http.post<UpdatePwdWithKeyResponse>(url, updatePwdWithKey);
  }

  getLoggedUser(user: User): Observable<LoginResponse> {
    let url = UrlUtils.BASE_URL + UrlUtils.GET_LOGGED_LOGIN_URL;
    let loginInfo: string = btoa(user.username + ':' + user.password);
    return this.http.post<LoginResponse>(url, this.buildLoginRequest(loginInfo));
  }

  getAdressByGouvernorat(gouvernorat: number): Observable<Adress[]> {
    return this.http.get<Adress[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ADRESS_URL + gouvernorat, this.buildHeader());
  }

  getAllTown(): Observable<Town[]> {
    return this.http.get<Town[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ALLTOWN_URL, this.buildHeader());
  }

  private buildIndividuRequest(individu: Individu) {
    let individuRequest: IndividuRequest = new IndividuRequest();
    individuRequest.individu = individu;
    individuRequest.requestContext = BrowserUtils.buildRequestContext();
    return individuRequest;
  }

  private buildUpdateRequestContext(username: string): UpdateStatusRequest {
    let updateReequestContext = new UpdateStatusRequest();
    updateReequestContext.username = username;
    updateReequestContext.requestContext = BrowserUtils.buildRequestContext();
    return updateReequestContext;
  }

  private buildLoginRequest(loginInfos: string): LoginRequest {
    let loginRequest: LoginRequest = new LoginRequest();
    loginRequest.loginInfos = loginInfos;
    loginRequest.requestContext = BrowserUtils.buildRequestContext();
    return loginRequest;
  }

  private buildValidationKeyRequest(username: string, key: string): ValidateKeyRequest {
    let validateKeyRequest = new ValidateKeyRequest();
    validateKeyRequest.username = username;
    validateKeyRequest.key = key;
    validateKeyRequest.requestContext = BrowserUtils.buildRequestContext();
    return validateKeyRequest;
  }

  private buildCheckEmailRequest(email: string): UpdateStatusRequest {
    let request = new UpdateStatusRequest();
    request.username = email;
    request.requestContext = BrowserUtils.buildRequestContext();
    request.requestContext.username = email;
    return request;
  }

}
