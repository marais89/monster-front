import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Individu} from '../../model/individu';
import {UrlUtils} from '../../utils/url-utils';
import {User} from '../../login/login.component';
import {CookiesUtils} from '../../utils/cookies-utils';


@Injectable()
export class IndividuApiService {

  private httpOptions = this.buildHeader();

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Basic ' + CookiesUtils.getCookie('token')})
    };
  }

  getAll(): Observable<Individu[]> {
    return this.http.get<Individu[]>(UrlUtils.BASE_URL + UrlUtils.INDIVIDUS_URL, this.buildHeader());
  }

  saveIndividu(individu: Individu): Observable<any> {
    let url = UrlUtils.BASE_URL + UrlUtils.CREATE_URL;
    return this.http.post(url, JSON.stringify(individu), this.buildHeader());
  };

  updateIndividu(individu: Individu): Observable<Individu> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDATE_URL;
    return this.http.post<Individu>(url, individu, this.buildHeader());
  };

  SuspendUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.SUSPEND_URL + login;
    return this.http.post<Individu[]>(url,login, this.buildHeader());
  };

  resumeUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.RESUME_URL + login;
    return this.http.post<Individu[]>(url, login, this.buildHeader());
  };

  deactivateUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.DEACTIVATE_URL + login;
    return this.http.post<Individu[]>(url, login, this.buildHeader());
  };

  retrieveIndividu(login: string): Observable<Individu> {
    let url = UrlUtils.BASE_URL + UrlUtils.RETRIEVE_INDIVIDU_URL + login;
    return this.http.get<Individu>(url, this.buildHeader());
  }

  getLoggedUser(user: User): Observable<User> {
    let url = UrlUtils.BASE_URL + UrlUtils.GET_LOGGED_LOGIN_URL;
    return this.http.post<User>(url, user.login);
  }

}
