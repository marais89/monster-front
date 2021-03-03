import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';
import {IndividuService} from '../shared/individu/individu.service';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {LanguageUtils} from '../utils/language-utils';

export class User {
  username: string;
  password: string;
  enabled: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  user: User;
  displayLoginErrorMsg: boolean = false;
  isUserDesabledErrorMsg: boolean = false;
  returnUrl: string;
  rememberMe: boolean = false;

  constructor(private individuApiService: IndividuApiService,
              private individuService: IndividuService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  //TODO remove
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.user = new User();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.verifyRememberMe();
  }

  login(): void {
    this.individuApiService.getLoggedUser(this.user).subscribe(u => {
      if (u) {
        if (!u.enabled) {
          this.displayErrorMessage(false);
          return;
        }
        CookiesUtils.setCookie('token', btoa(this.user.username + ':' + this.user.password));
        this.individuApiService.retrieveIndividu(this.user.username).subscribe(indiv => {
          this.individuService.connectedUserInfo = indiv.individu;
          this.individuService.connectedUserRole = indiv.role;
          this.updateRememberMe();
          this.router.navigateByUrl(this.returnUrl);
        });
      } else {
        this.displayErrorMessage(true);
      }
    });
  }

  updateRememberMe() {
    localStorage.removeItem('username');
    localStorage.removeItem('RememberMe');
    if (this.rememberMe) {
      localStorage.setItem('username', this.user.username);
      localStorage.setItem('RememberMe', JSON.stringify(this.rememberMe));
    }
  }

  verifyRememberMe() {
    if (JSON.parse(localStorage.getItem('RememberMe')) !== null) {
      this.user.username = localStorage.getItem('username');
      this.rememberMe = JSON.parse(localStorage.getItem('RememberMe'));
    }
  }


  displayErrorMessage(isLogginError: boolean) {
    this.displayLoginErrorMsg = isLogginError;
    this.isUserDesabledErrorMsg = !isLogginError;
  }

}
