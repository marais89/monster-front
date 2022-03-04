import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {Business} from '../../model/business';
import {UrlUtils} from '../../utils/url-utils';

@Injectable()
export class BusinessApiService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  getBusinessByCreatorId(creatorId: number): Observable<Business> {
    return this.http.get<Business>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_BUSINESS_BY_CREATOR + creatorId, this.buildHeader());
  }

  saveBusiness(business: Business): Observable<Business> {
    let url = UrlUtils.BASE_URL + UrlUtils.SAVE_BUSINESS;
    return this.http.post<Business>(url, business, this.buildHeader());
  }

  updateBusiness(business: Business): Observable<Business> {
    let url = UrlUtils.BASE_URL + UrlUtils.UPDATE_BUSINESS;
    return this.http.post<Business>(url, business, this.buildHeader());
  }


}
