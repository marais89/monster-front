import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {IndividuService} from './shared/individu/individu.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: IndividuService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
