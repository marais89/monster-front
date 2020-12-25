import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {Wording_FR} from '../shared/wording_FR';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit, AfterViewInit {

  WORDING = Wording_FR;
  individu: Individu;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
