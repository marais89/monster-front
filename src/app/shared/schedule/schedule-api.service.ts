import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {UrlUtils} from '../../utils/url-utils';
import {Schedule} from '../../model/schedule';
import {Project} from '../../model/project';
import {Period} from '../../model/period';

@Injectable({
  providedIn: 'root'
})
export class ScheduleApiService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  findProjectsByBusinessId(businessId: number): Observable<Project[]> {
    const url = UrlUtils.BASE_URL + '/projects/businessId/' + businessId;
    return this.http.get<Project[]>(url, this.buildHeader());
  }

  findDailyPlanningByPeriod(userBusinessRelationId: number, period: Period): Observable<Schedule[]> {
    const url = UrlUtils.BASE_URL + '/schedule/relationId/' + userBusinessRelationId;
    return this.http.post<Schedule[]>(url,period ,this.buildHeader());
  }

  saveSchedules(schedules: Schedule[]): Observable<Schedule[]>{
    const url = UrlUtils.BASE_URL + '/schedule/save/';
    return this.http.post<Schedule[]>(url, schedules, this.buildHeader());
  }



}
