import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {UrlUtils} from '../../utils/url-utils';
import {UserBusinessRelation} from '../../model/business/user-business-relation';

@Injectable({
  providedIn: 'root'
})
export class UserBusinessRelationService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  saveUserBusinessRelation(userBusinessRelation: UserBusinessRelation): Observable<UserBusinessRelation[]> {

    let url = UrlUtils.BASE_URL + UrlUtils.USER_BUSINESS_RELATION + '/save';
    return this.http.post<UserBusinessRelation[]>(url, userBusinessRelation, this.buildHeader());
  }

  findUserBusinessRelationByBusinessId(userBusinessId: number): Observable<UserBusinessRelation[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.USER_BUSINESS_RELATION + '/businessId/' + userBusinessId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  findUserBusinessRelationByUserEmail(userEmail: string): Observable<UserBusinessRelation[]> {
    let url = UrlUtils.BASE_URL + UrlUtils.USER_BUSINESS_RELATION + '/userEmail/' + userEmail;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }


  findUserBusinessRelationByBusinessIdAndUserEmail(businessId: number, userEmail: string): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/businessId/' + businessId + '/userEmail/' + userEmail;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  findUserBusinessRelationByGroupId(groupId: number): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/groupId/' + groupId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  saveUserBusinessRelationByGroupId(userBusinessRelation: UserBusinessRelation): Observable<UserBusinessRelation> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/save';
    return this.http.post<UserBusinessRelation>(url, userBusinessRelation, this.buildHeader());
  }
}
