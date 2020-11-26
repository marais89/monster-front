import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IndividuService} from '../shared/individu/individu.service';
import {Individu} from '../model/individu';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent implements OnInit {

  individu: Individu;
  role: string;

  anonymousPic = 'assets/anonymous.jpg';
  private user_pic: any;
  private display_name: string;

  constructor(private individuService: IndividuService, private sanitizer: DomSanitizer) {
  }

//TODO update user image after update user info
  ngOnInit() {
    if (!this.individu) {
      this.individuService.chargeLogedUserInfo().subscribe(data => {
          this.individu = data;
          this.role= this.individuService.connectedUserRole;
          this.user_pic = this.retrieveUserPic();
          this.display_name = this.retrieveDisplayedUserName();
        }
      );
    } else {
      this.user_pic = this.retrieveUserPic();
      this.display_name = this.retrieveDisplayedUserName();
    }
  }

  retrieveUserPic() {
    return (this.individu && this.individu.user_image) ? this.convertImage(this.individu.user_image) : this.anonymousPic;
  }

  retrieveDisplayedUserName(): string {
    return (this.individu && this.individu.nom) ? this.individu.nom : '';
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  logout() {
    this.individuService.logout();
  }

}
