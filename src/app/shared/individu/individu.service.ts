import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Individu} from '../../model/individu';
import {UrlUtils} from '../../utils/url-utils';
import {User} from '../../login/login.component';
import {StringUtils} from '../../utils/string-utils';
import {CookiesUtils} from '../../utils/cookies-utils';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class IndividuService {

  private httpOptions = this.buildHeader();

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Basic ' + CookiesUtils.getCookie('token')})
    };
  }

  private buildCustomHeader(name: string, value: string) {
    return {
      headers: new HttpHeaders({Authorization: 'Basic ' + name + ':' + value})
    };
  }

  private buildHeaderWithoutCokies() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
  }

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Individu[]> {
    return this.http.get<Individu[]>(UrlUtils.BASE_URL + UrlUtils.INDIVIDUS_URL, this.buildHeader());
    //TODO CATCH exception
  }

  saveIndividu(individu: Individu): Observable<any> {
    let url = UrlUtils.BASE_URL + UrlUtils.CREATE_URL;
    return this.http.post(url, JSON.stringify(individu), this.buildHeaderWithoutCokies());
    //TODO CATCH exception
  };

  deleteIndividu(id: number): Observable<Object> {
    let url = UrlUtils.BASE_URL + UrlUtils.INDIVIDUS_URL + UrlUtils.DELETE_URL + id;
    return this.http.delete(url, this.buildHeader());
    //TODO CATCH exception
  }

  getLoggedUser(user: User): Observable<User> {
    let url = UrlUtils.BASE_URL + UrlUtils.GET_LOGGED_LOGIN_URL;
    return this.http.post<User>(url,
       user.login,
     );
  }

  isAuthenticated(): boolean {
    let token = CookiesUtils.getCookie('token');
    return !StringUtils.isNullOrUndefined(token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
