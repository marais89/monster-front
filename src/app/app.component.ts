import {Component} from '@angular/core';
import {IndividuService} from './shared/individu/individu.service';
import {CookiesUtils} from './utils/cookies-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RAIS-RAIS';
  private LOGO = 'assets/rabbit.png';

  constructor(private individuService: IndividuService) {
  }

  isClientConnected(): boolean {
    return this.individuService.isAuthenticated();
  }

  logout() {
    CookiesUtils.deleteCookie('token');
  }

}
