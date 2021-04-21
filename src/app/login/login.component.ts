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
  istechnicalErrorMsg: boolean = false;
  returnUrl: string;
  rememberMe: boolean = false;
  restTentativeCount: number = 0;
  fieldTextType: boolean = false;

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
        if (u.isValidCredentials) {
          CookiesUtils.setCookie('token', u.accessToken);
          CookiesUtils.setCookie('user', btoa(this.user.username));
          this.individuApiService.retrieveIndividu(this.user.username).subscribe(indiv => {
            this.individuService.connectedUserInfo = indiv.individu;
            this.individuService.connectedUserRole = indiv.role;
            this.updateRememberMe();
            this.router.navigateByUrl(this.returnUrl);
          });
        } else if (!u.isUserActive) {
          //dispaluy user blocked
          this.displayErrorMessage(false);
          return;
        } else {
          //display incorrect password
          this.restTentativeCount = u.failedTentativeCount < 5 ? 5 - u.failedTentativeCount : 0;
          this.displayErrorMessage(true);
        }
      } else {
        //technical error
        this.displayTechnicalErrorMsg();
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
    this.istechnicalErrorMsg = false;
  }

  displayTechnicalErrorMsg() {
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.istechnicalErrorMsg = true;
  }

  toggleFieldTextType(){
    this.fieldTextType = !this.fieldTextType;
  }

}
