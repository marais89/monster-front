import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {IndividuService} from './shared/individu/individu.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public individuService: IndividuService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.individuService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public individuService: IndividuService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.individuService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
