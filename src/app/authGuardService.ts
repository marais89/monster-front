import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {IndividuService} from './shared/individu/individu.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public individuService: IndividuService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.individuService.isAuthenticated()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
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
