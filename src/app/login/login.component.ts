import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';
import * as bcrypt from 'bcryptjs';
import {IndividuService} from '../shared/individu/individu.service';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {LanguageUtils} from '../utils/language-utils';

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

  WORDING = LanguageUtils.getWordingLanguage();
  private user: User;
  displayLoginErrorMsg: boolean = false;
  isUserDesabledErrorMsg: boolean = false;
  returnUrl: string;
  private rememberMe: boolean = false;

  constructor(private individuApiService: IndividuApiService, private individuService: IndividuService, private router: Router, private route: ActivatedRoute) {
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
        if (bcrypt.compareSync(this.user.password, u.password)) {
          if (!u.enabled) {
            this.displayErrorMessage(false);
            return;
          }
          CookiesUtils.setCookie('token', btoa(this.user.login + ':' + this.user.password));
          this.individuApiService.retrieveIndividu(this.user.login).subscribe(indiv => {
            this.individuService.connectedUserInfo = indiv.individu;
            this.individuService.connectedUserRole = indiv.role;
            this.updateRememberMe();
            this.router.navigateByUrl(this.returnUrl);
          });
        } else {
          this.displayErrorMessage(true);
        }
      } else {
        this.displayErrorMessage(true);
      }
    });
  }

  updateRememberMe(){
    localStorage.removeItem('login');
    localStorage.removeItem('RememberMe');
    if(this.rememberMe){
      localStorage.setItem('login', this.user.login);
      localStorage.setItem('RememberMe', JSON.stringify(this.rememberMe));
    }
  }

  verifyRememberMe(){
    if(JSON.parse(localStorage.getItem('RememberMe')) !== null)
    {
      this.user.login = localStorage.getItem('login');
      this.rememberMe = JSON.parse(localStorage.getItem('RememberMe'));
    }
  }



  displayErrorMessage(isLogginError: boolean) {
    this.displayLoginErrorMsg = isLogginError;
    this.isUserDesabledErrorMsg = !isLogginError;
  }

}
