import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {Wording} from '../shared/wording';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit, AfterViewInit {

  WORDING = Wording;
  individu: Individu;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
