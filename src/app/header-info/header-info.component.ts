import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IndividuService} from '../shared/individu/individu.service';
import {Individu} from '../model/individu';
import {LanguageEnum, LanguageUtils} from '../utils/language-utils';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.css']
})
export class HeaderInfoComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  flag_fr = 'assets/france.png';
  flag_en = 'assets/britsh.png';

  @Output() changeLanguageEvent = new EventEmitter<string>();

  changeLanguage(value) {
    this.changeLanguageEvent.emit(value);
  }

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

  setFranshLanguage() {
    LanguageUtils.setLanguage(LanguageEnum.FR);
    this.WORDING = LanguageUtils.whichWording(LanguageEnum.FR);
    this.changeLanguage(LanguageEnum.FR);
  }

  setEnglishLanguage() {
    LanguageUtils.setLanguage(LanguageEnum.EN);
    this.WORDING = LanguageUtils.whichWording(LanguageEnum.EN);
    this.changeLanguage(LanguageEnum.EN);
  }

  logout() {
    this.individuService.logout();
  }

}
