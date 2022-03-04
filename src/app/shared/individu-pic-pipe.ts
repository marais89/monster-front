import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'individuPicPipe'
})
export class IndividuPicPipe implements PipeTransform {

  anonymousPic = 'assets/anonymous.jpg';

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url) {
    if (url) {
      let objectURL = 'data:image/png;base64,' + url;
      return this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
    }
    return this.anonymousPic;
  }

}