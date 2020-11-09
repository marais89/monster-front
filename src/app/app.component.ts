import {Component} from '@angular/core';
import {IndividuService} from './shared/individu/individu.service';
import {CookiesUtils} from './utils/cookies-utils';
import {Individu} from './model/individu';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RAIS-RAIS';
  private LOGO = 'assets/rabbit.png';
  anonymousPic = 'assets/anonymous.jpg';
  name = 'Boss';
  individu: Individu;
  user_image: any;

  constructor(private individuService: IndividuService, private sanitizer: DomSanitizer) {
  }

  isClientConnected(): boolean {

    let bol = this.individuService.isAuthenticated();
    if (bol && this.name == 'Boss') {
      this.chargeLogedUserInfo();
    }
    return bol;
  }

  chargeLogedUserInfo() {
    let token = CookiesUtils.getCookie('token');
    if (token) {
      let login = atob(token).split(':')[0];
      this.individuService.retrieveIndividu(login).subscribe(
        indiv => {
          if (indiv) {
            this.individu = indiv;
            this.user_image = this.convertImage(this.individu.user_image);
            this.name = indiv.nom;
          }
        }
      );
    }
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  logout() {
    CookiesUtils.deleteCookie('token');
    this.name = 'Boss';
    this.individu = null;
  }

}
