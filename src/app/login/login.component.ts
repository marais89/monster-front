import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';
import * as bcrypt from 'bcryptjs';
import {IndividuService} from '../shared/individu/individu.service';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {Wording} from '../shared/wording';

export class User {
  login: string;
  password: string;
  enabled: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  WORDING = Wording;
  private user: User;
  displayLoginErrorMsg: boolean = false;
  isUserDesabledErrorMsg: boolean = false;

  constructor(private individuApiService: IndividuApiService, private individuService: IndividuService, private router: Router) {
  }

  //TODO remove
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.user = new User();
  }

  login(): void {
    this.individuApiService.getLoggedUser(this.user).subscribe(u => {
      if (u) {
        if (bcrypt.compareSync(this.user.password, u.password)) {
          if (!u.enabled) {
            this.displayErrorMessage(false);
            return;
          }
          CookiesUtils.setCookie('token', btoa(this.user.login + ':' + this.user.password));
          this.individuApiService.retrieveIndividu(this.user.login).subscribe(indiv => {
            this.individuService.connectedUserInfo = indiv.individu;
            this.individuService.connectedUserRole = indiv.role;
            this.router.navigate(['']);
          });
        } else {
          this.displayErrorMessage(true);
        }
      } else {
        this.displayErrorMessage(true);
      }
    });
  }

  displayErrorMessage(isLogginError: boolean) {
    this.displayLoginErrorMsg = isLogginError;
    this.isUserDesabledErrorMsg = !isLogginError;
  }

}
