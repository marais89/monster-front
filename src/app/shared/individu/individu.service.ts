import {CookiesUtils} from '../../utils/cookies-utils';
import {StringUtils} from '../../utils/string-utils';
import {Individu} from '../../model/individu';
import {Injectable} from '@angular/core';
import {IndividuApiService} from './individu-api.service';
import {Observable, of} from 'rxjs';
import {UserStatutAction} from '../../utils/user-statut-action';
import {concatMap} from 'rxjs/operators';
import {Authorities} from '../../model/authorities';

@Injectable()
export class IndividuService {

  connectedUserInfo: Individu;
  language: string = 'FR';
  connectedUserRole: string;

  constructor(private individuApiService: IndividuApiService) {
  }

  isAuthenticated(): boolean {
    // TODO verify if login and pwd are correct !
    return !StringUtils.isNullOrUndefined(CookiesUtils.getLoginFromToken());
  }

  chargeLogedUserInfo(): Observable<Individu> {
    return this.connectedUserInfo ? of(this.connectedUserInfo) : this.getLoggedUserFromToken();
  }

  public getLoggedUserFromToken(): Observable<Individu> {

    let username = CookiesUtils.getLoginFromToken();
    if (username) {
      return this.individuApiService.retrieveIndividu(username).pipe(
        concatMap(data => {
          this.connectedUserInfo = data.individu;
          this.connectedUserRole = data.role;
          return of(this.connectedUserInfo);
        }));
    } else {
      return null;
    }
  }

  public upgradeUserToBusinessAdmin(username: string): Observable<Authorities> {
    return this.individuApiService.upgradeUserToBusinessAdmin(username).pipe(
      concatMap(data => {
          this.connectedUserRole = data.authority;
          return of(data);
        }
      ));
  }

  public updateUserStatus(username: string, action: UserStatutAction) {
    switch (action) {
      case UserStatutAction.SUSPEND : {
        return this.individuApiService.SuspendUser(username);
      }
      case UserStatutAction.RESUME : {
        return this.individuApiService.resumeUser(username);
      }
      case UserStatutAction.DEACTIVATE : {
        return this.individuApiService.deactivateUser(username);
      }
      default : {
        console.log('Action: ' + action + ' is not knwon');
        break;
      }
    }
  }

  logout() {
    CookiesUtils.deleteCookie('token');
    this.connectedUserInfo = null;
  }

  isAdmin(): boolean {
    return this.connectedUserRole == 'ROLE_ADMIN';
  }

  isSuperUser(): boolean {
    return this.connectedUserRole == 'ROLE_SUPERUSER';
  }

  isBusinessAdmin() {
    //TODO verify userBusinessRelation table insted global role
    return this.connectedUserRole == 'ROLE_BUSINESS_ADMIN';
  }

}
