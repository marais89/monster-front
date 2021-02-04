import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';

export class BrowserUtils {

  public static findBrowserType(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('IE') > -1:
        return 'ie';
      case agent.indexOf('MSIE') > -1:
        return 'ie';
      case agent.indexOf('Internet Explorer') > -1:
        return 'ie';
      case agent.indexOf('IE Mobile') > -1:
        return 'ie mobile';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  public static findOs() {

    const appVersion = window.navigator.appVersion;
    switch (true) {
      case appVersion.indexOf('Win') > -1:
        return 'Windows';
      case appVersion.indexOf('"Mac') > -1:
        return 'MacOS';
      case appVersion.indexOf('X11') > -1:
        return 'UNIX';
      case appVersion.indexOf('Linux') > -1:
        return 'Linux';
      default:
        return 'Unknown OS';
    }
  }

  public static getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position: latitude" + position.coords.latitude+ "|" + "longitude" + position.coords.longitude);
      return position;
    });
  }

  public static getIpAddress() {
    //TODO verify if it's possible to get user ip adress
  }
}
