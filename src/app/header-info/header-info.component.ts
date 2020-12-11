import {Component, OnInit} from '@angular/core';
import {IndividuService} from '../shared/individu/individu.service';
import {Individu} from '../model/individu';
import {Wording} from '../shared/wording';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent implements OnInit {

  WORDING = Wording;
  individu: Individu;

  constructor(private individuService: IndividuService) {
  }

//TODO update user image after update user info
  ngOnInit() {
    if (!this.individu) {
      this.individuService.chargeLogedUserInfo().subscribe(data => {
          this.individu = data;
        }
      );
    }
  }

  isAdmin(): boolean {
    return this.individuService.isAdmin();
  }

  logout() {
    this.individuService.logout();
  }

}
