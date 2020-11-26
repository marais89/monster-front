import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit, AfterViewInit {

  individu: Individu;
  anonymousPic = 'assets/anonymous.jpg';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  retrieveUserPic(){
    return this.individu && this.individu.user_image ? this.individu.user_image : this.anonymousPic;
  }
}
