import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {LanguageUtils} from '../utils/language-utils';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit, AfterViewInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }
}
