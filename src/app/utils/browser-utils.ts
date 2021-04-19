import {Observable, of} from 'rxjs';
import {RequestContext} from '../model/request-context';
import {CookiesUtils} from './cookies-utils';

export class BrowserUtils {

  public static position: Position;

  public static findBrowserType(): string {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('edg') > -1:
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

  public static findOs(): string {

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

  public static getPosition(): Observable<Position> {
    return this.position ? of(this.position) :
      new Observable(obs => {
        navigator.geolocation.getCurrentPosition(
          success => {
            obs.next(success);
            obs.complete();
          },
          error => {
            obs.error(error);
          }
        );
      });
  }

  public static getIpAddress() {
    //TODO verify if it's possible to get user ip adress
  }

  public static buildRequestContext(): RequestContext {
    let request: RequestContext = new RequestContext();
    request.username = CookiesUtils.getLoginFromToken();
    request.browserName = this.findBrowserType();
    request.osName = this.findOs();
    if (this.position && this.position.coords) {
      request.location = this.position.coords.latitude + '#' + this.position.coords.longitude;
    }
    request.channel = 'client';

    return request;
  }

}
