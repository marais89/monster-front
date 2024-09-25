import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {Business} from '../../model/business/business';
import {UrlUtils} from '../../utils/url-utils';
import {BusinessGroup} from '../../model/business/business-group';
import {UserBusinessRelation} from '../../model/business/user-business-relation';


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


  //Business group

  getBusinessGroupByBusinessId(businessId: number): Observable<BusinessGroup[]> {
    return this.http.get<BusinessGroup[]>(UrlUtils.BASE_URL
      + UrlUtils.RETRIEVE_BUSINESS_GROUP_BY_BUSINESS_ID + businessId + '/businessGroups', this.buildHeader());
  }

  saveBusinessGroup(businessGroup: BusinessGroup): Observable<BusinessGroup> {
    let url = UrlUtils.BASE_URL + UrlUtils.SAVE_BUSINESS_GROUP;
    return this.http.post<BusinessGroup>(url, businessGroup, this.buildHeader());
  }

  disableBusinessGroup(businessGroupId: number): Observable<BusinessGroup> {
    let url = UrlUtils.BASE_URL + UrlUtils.DESABLE_BUSINESS_GROUP + businessGroupId + '/disable';
    return this.http.post<BusinessGroup>(url, businessGroupId, this.buildHeader());
  }

  activateBusinessGroup(businessGroupId: number): Observable<BusinessGroup> {
    let url = UrlUtils.BASE_URL + UrlUtils.ACTIVATE_BUSINESS_GROUP + businessGroupId + '/activate';
    return this.http.post<BusinessGroup>(url, businessGroupId, this.buildHeader());
  }


  findBusinessRelationsByBusinessId(businessId: number): Observable<UserBusinessRelation[]> {

    let url = UrlUtils.BASE_URL + UrlUtils.FIND_BUSINESS_RELATIONS_BY_BUSINESS_ID;
    return this.http.get<UserBusinessRelation[]>(url + businessId, this.buildHeader());
  }


}
