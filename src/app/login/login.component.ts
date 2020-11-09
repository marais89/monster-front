import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IndividuService} from '../shared/individu/individu.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';
import * as bcrypt from 'bcryptjs';
import {Individu} from '../model/individu';

export class User {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  displayLoginErrorMsg: boolean = false;
  constructor(private individuService: IndividuService, private router: Router) {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.user = new User();
  }

  login(): void {
    this.individuService.getLoggedUser(this.user).subscribe(u => {
      if (u) {
        if (bcrypt.compareSync(this.user.password, u.password)) {
          CookiesUtils.setCookie('token', btoa(this.user.login + ':' + this.user.password));
          this.router.navigate(['']);
        } else {
          this.displayLoginErrorMsg = true;
        }
      } else {
        this.displayLoginErrorMsg = true;
      }
    });
  }

  logout() {
    CookiesUtils.deleteCookie('token');
  }

}
