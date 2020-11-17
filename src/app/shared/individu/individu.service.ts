import {CookiesUtils} from '../../utils/cookies-utils';
import {StringUtils} from '../../utils/string-utils';
import {Individu} from '../../model/individu';
import {Injectable} from '@angular/core';
import {IndividuApiService} from './individu-api.service';
import {Observable, of} from 'rxjs';
import {UserStatutAction} from '../../utils/user-statut-action';

@Injectable()
export class IndividuService {

  connectedUserInfo: Individu;

  constructor(private individuApiService: IndividuApiService) {
  }

  isAuthenticated(): boolean {
    // TODO verify if login and pwd are correct !
    return !StringUtils.isNullOrUndefined(this.getLoginFromToken());
  }

  private getLoginFromToken(): string {

    let token = CookiesUtils.getCookie('token');
    if (token) {
      return atob(token).split(':')[0];
    }
    return null;
  }

  chargeLogedUserInfo(): Observable<Individu> {
    return this.connectedUserInfo ? of(this.connectedUserInfo) : this.getLoggedUserFromToken();
  }

  public getLoggedUserFromToken(): Observable<Individu> {

    let login = this.getLoginFromToken();
    if (login) {
      return this.individuApiService.retrieveIndividu(login);
    } else {
      console.log('No TOKEN found !');
      return null;
    }
  }

  public updateUserStatus(login: string, action: UserStatutAction) {
    switch (action) {
      case UserStatutAction.SUSPEND : {
        return this.individuApiService.SuspendUser(login);
      }
      case UserStatutAction.RESUME : {
        return this.individuApiService.resumeUser(login);
      }
      case UserStatutAction.DEACTIVATE : {
        return this.individuApiService.deactivateUser(login);
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

}
