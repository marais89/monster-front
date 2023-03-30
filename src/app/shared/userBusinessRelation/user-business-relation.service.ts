import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {UrlUtils} from '../../utils/url-utils';
import {UserBusinessRelation} from '../../model/user-business-relation';

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

  findUserBusinessRelationByUserId(userId: number): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/userId/' + userId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  findUserBusinessRelationByBusinessId(businessId: number): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/businessId/' + businessId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  findUserBusinessRelationByBusinessIdAndUserId(businessId: number, userId: number): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/businessId/' + businessId + '/userId/' + userId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  findUserBusinessRelationByGroupId(groupId: number): Observable<UserBusinessRelation[]> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/groupId/' + groupId;
    return this.http.get<UserBusinessRelation[]>(url, this.buildHeader());
  }

  saveUserBusinessRelationByGroupId(userBusinessRelation: UserBusinessRelation): Observable<UserBusinessRelation> {
    const url = UrlUtils.BASE_URL + '/business/userBusinessRelation/save';
    return this.http.post<UserBusinessRelation>(url,userBusinessRelation, this.buildHeader());
  }
}
