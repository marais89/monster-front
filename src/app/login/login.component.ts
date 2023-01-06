import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';
import {IndividuService} from '../shared/individu/individu.service';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {LanguageEnum, LanguageUtils} from '../utils/language-utils';
import {isNullOrUndefined} from 'util';
import * as bcrypt from 'bcryptjs';
import {CheckUserErrorType} from '../model/check-user';
import {UpdatePwdWithKey} from '../model/update-pwd-with-key';
import {Responsetype} from '../model/update-pwd-with-key-response';

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
  isNotValidOrExpiredKeyMsg: boolean = false;
  isPwpUpdatedSuccessfullyMsg: boolean = false;
  returnUrl: string;
  rememberMe: boolean = false;
  restTentativeCount: number = 0;
  fieldTextType: boolean = false;
  isLogin: boolean = true;
  isUserNotFound: boolean = false;
  userEmail: string;
  isEmailSend: boolean = false;
  REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  key: string;
  updatePwdWithKey: UpdatePwdWithKey;
  pwd: string;
  pwdConfirmation: string;
  private displayUpdatePwd: boolean = false;
  flag_fr = 'assets/france.png';
  flag_en = 'assets/britsh.png';
  selectedFlag: string;

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
    this.doUpdatePwd();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.verifyRememberMe();
    this.whichLanguage();
  }

  whichLanguage() {
    if (isNullOrUndefined(CookiesUtils.getCookie('language'))) {
      this.selectedFlag = this.flag_fr;
    } else {
      var flag = CookiesUtils.getCookie('language');
      if (flag === 'FR') {
        this.selectedFlag = this.flag_fr;
      } else {
        this.selectedFlag = this.flag_en;
      }
    }
  }

  doUpdatePwd() {
    this.key = this.route.snapshot.queryParams['key'] || undefined;
    if (!isNullOrUndefined(this.key)) {
      this.updatePwdWithKey = new UpdatePwdWithKey();
      this.updatePwdWithKey.key = this.key;
      this.displayUpdatePwd = true;
    }
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
        } else if (u.isUserActive == null) {
          this.displayErrorMessage(true);
          this.restTentativeCount = -1;
          return;
        } else if (!u.isUserActive) {
          //dispaluy user blocked
          this.displayErrorMessage(false);
          return;
        } else {
          //display incorrect password
          this.restTentativeCount = u.failedTentativeCount < 5 ? 5 - u.failedTentativeCount : 0;
          this.displayErrorMessage(true);
          return;
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

  checkUserByEmail() {
    this.individuApiService.checkUserByEmail(this.userEmail).subscribe(r => {
        if (r) {
          if (r.isValidUser) {
            this.displayVerifEmailSuccessMsg();
          } else {
            switch (r.errorType) {
              case CheckUserErrorType.BLOCKED_USER:
                this.displayErrorMessage(false);
                break;
              case CheckUserErrorType.USER_NOT_FOUND:
                this.displayUserNotFoundErrorMsg();
                break;
              default:
                this.displayTechnicalErrorMsg();
                break;
            }
          }
        } else {
          this.displayTechnicalErrorMsg();
        }
      },
      error => {
        this.displayTechnicalErrorMsg();
      });
  }

  updtePwdWithKey() {
    const salt = bcrypt.genSaltSync(10);
    this.updatePwdWithKey.newPassword = bcrypt.hashSync(this.pwd, salt);
    this.individuApiService.updatePwdWithKey(this.updatePwdWithKey).subscribe(res => {
        if (!isNullOrUndefined(res) && !isNullOrUndefined(res.response)) {
          switch (res.response) {
            case Responsetype.ERROR && Responsetype.EXPIRED_KEY && Responsetype.NOT_VALID_KEY :
              this.displayNotValidOrExpiredKeyMsg();
              break;
            case Responsetype.OK:
              this.displayPwpUdatedSuccessfullyMsg();
              break;
          }
        }
      },
      error => this.displayTechnicalErrorMsg());
  }


  displayErrorMessage(isLogginError: boolean) {
    this.isNotValidOrExpiredKeyMsg = false;
    this.isPwpUpdatedSuccessfullyMsg = false;
    this.isUserNotFound = false;
    this.displayLoginErrorMsg = isLogginError;
    this.isUserDesabledErrorMsg = !isLogginError;
    this.istechnicalErrorMsg = false;
    this.isEmailSend = false;
  }

  displayTechnicalErrorMsg() {
    this.isNotValidOrExpiredKeyMsg = false;
    this.isPwpUpdatedSuccessfullyMsg = false;
    this.isUserNotFound = false;
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.isEmailSend = false;
    this.istechnicalErrorMsg = true;
  }

  displayUserNotFoundErrorMsg() {
    this.isNotValidOrExpiredKeyMsg = false;
    this.isPwpUpdatedSuccessfullyMsg = false;
    this.isUserNotFound = true;
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.isEmailSend = false;
    this.istechnicalErrorMsg = false;
  }

  displayVerifEmailSuccessMsg() {
    this.isNotValidOrExpiredKeyMsg = false;
    this.isPwpUpdatedSuccessfullyMsg = false;
    this.isUserNotFound = false;
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.isEmailSend = true;
    this.istechnicalErrorMsg = false;
  }

  displayNotValidOrExpiredKeyMsg() {
    this.isNotValidOrExpiredKeyMsg = true;
    this.isPwpUpdatedSuccessfullyMsg = false;
    this.isUserNotFound = false;
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.isEmailSend = false;
    this.istechnicalErrorMsg = false;
  }

  displayPwpUdatedSuccessfullyMsg() {
    this.isNotValidOrExpiredKeyMsg = false;
    this.isPwpUpdatedSuccessfullyMsg = true;
    this.isUserNotFound = false;
    this.displayLoginErrorMsg = false;
    this.isUserDesabledErrorMsg = false;
    this.isEmailSend = false;
    this.istechnicalErrorMsg = false;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  pwdForgotten() {
    this.isLogin = false;
  }

  isNotValidEmail(): boolean {
    return (isNullOrUndefined(this.userEmail) || !this.REGEXP.test(this.userEmail));
  }

  switchToLogin() {
    this.isLogin = true;
    this.displayUpdatePwd = false;
  }

  isConformPwd(): boolean {
    let bol = this.pwd === this.pwdConfirmation || this.pwdConfirmation == undefined;
    return bol;
  }

  setFranshLanguage() {
    LanguageUtils.setLanguage(LanguageEnum.FR);
    this.selectedFlag = this.flag_fr;
    this.WORDING = LanguageUtils.whichWording(LanguageEnum.FR);
  }

  setEnglishLanguage() {
    LanguageUtils.setLanguage(LanguageEnum.EN);
    this.selectedFlag = this.flag_en;
    this.WORDING = LanguageUtils.whichWording(LanguageEnum.EN);
  }

}
