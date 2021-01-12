import {CookiesUtils} from './cookies-utils';
import {isNullOrUndefined} from 'util';
import {Wording_FR} from '../shared/wording_FR';
import {Wording_EN} from '../shared/wording_EN';

export enum LanguageEnum {
  FR = 'FR',
  EN = 'EN',
}

export class LanguageUtils {


  public static setLanguage(language: LanguageEnum) {
    CookiesUtils.setCookieWithoutTime('language', language);
  }

  public static getWordingLanguage() {
    return isNullOrUndefined(CookiesUtils.getCookie('language')) ? Wording_FR : this.whichWording(CookiesUtils.getCookie('language'));
  }

  public static whichWording(lang: string) {
    if (lang === 'EN') {
      return Wording_EN;
    } else {
      return Wording_FR;
    }
  }

}
