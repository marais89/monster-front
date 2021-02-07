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
    return this.http.post<SavingResponse>(url, individu, this.buildStandardHeader());
  };

  updateIndividu(individu: Individu): Observable<Individu> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDATE_URL;
    return this.http.post<Individu>(url, individu, this.buildHeader());
  };

  SuspendUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.SUSPEND_URL + login;
    return this.http.post<Individu[]>(url, login, this.buildHeader());
  };

  verifyKey(login: string, key: string): Observable<boolean> {
    let url = UrlUtils.BASE_URL + '/individus/login/'+login+'/key/'+key+'/validation';
    return this.http.post<boolean>(url,login, this.buildHeader());
  };

  resumeUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.RESUME_URL + login;
    return this.http.post<Individu[]>(url, login, this.buildHeader());
  };

  deactivateUser(login: string): Observable<Individu[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.DEACTIVATE_URL + login;
    return this.http.post<Individu[]>(url, login, this.buildHeader());
  };

  retrieveIndividu(login: string): Observable<IndividuGlobaleInfos> {
    let url = UrlUtils.BASE_URL + UrlUtils.RETRIEVE_INDIVIDU_URL + login;
    return this.http.get<IndividuGlobaleInfos>(url, this.buildHeader());
  }

  getLoggedUser(user: User): Observable<User> {
    let url = UrlUtils.BASE_URL + UrlUtils.GET_LOGGED_LOGIN_URL;
    return this.http.post<User>(url, user.login);
  }

  getAdressByGouvernorat(gouvernorat: number): Observable<Adress[]> {
    return this.http.get<Adress[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ADRESS_URL + gouvernorat, this.buildHeader());
  }

  getAllTown(): Observable<Town[]> {
    return this.http.get<Town[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ALLTOWN_URL , this.buildHeader());
  }

}
