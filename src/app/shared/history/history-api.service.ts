import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {UrlUtils} from '../../utils/url-utils';
import {Events} from '../../model/Events';

@Injectable()
export class HistoryApiService {


  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  getHistoriesByUsername(username: string): Observable<Events[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.RETRIEVE_EVENTS_OF_USER_URL + username;
    return this.http.get<Events[]>(url, this.buildHeader());
  }
}
