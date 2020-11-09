import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuService} from '../shared/individu/individu.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {CookiesUtils} from '../utils/cookies-utils';
import {DomSanitizer} from '@angular/platform-browser';
import {Statut} from '../individu-create/individu-create.component';
import {root} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-individu-account',
  templateUrl: './individu-account.component.html',
  styleUrls: ['./individu-account.component.css']
})
export class IndividuAccountComponent implements OnInit {

  individu: Individu = new Individu();
  displayErrorMsg: boolean = false;
  actualDate: Date;
  anonymousPic = 'assets/anonymous.jpg';
  verifiedLogo = 'assets/verified.png';
  star = 'assets/star.png';
  base64textString;
  statut: Statut;
  private user_image: any;

  constructor(private individuService: IndividuService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.chargeLogedUserInfo();
    let pic = document.getElementById('OpenImgUpload1');
    let anonymousPic = document.getElementById('OpenImgUpload2');
    let picture = document.getElementById('imgupload');
    pic.addEventListener('click', (e: Event) => picture.click());
    anonymousPic.addEventListener('click', (e: Event) => picture.click());
  }

  chargeLogedUserInfo() {
    let token = CookiesUtils.getCookie('token');
    if (token) {
      let login = atob(token).split(':')[0];
      this.individuService.retrieveIndividu(login).subscribe(
        indiv => {
          if (indiv) {
            this.individu = indiv;
            this.user_image = this.convertImage(this.individu.user_image);
          }
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  updateIndividuAccountInformations() {
    this.individuService.updateIndividu(this.individu).subscribe(
      data => {
        console.log('individu updated');
      },
      error1 => {
        this.displayErrorMsg;
      }
    );
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.user_image = ('data:image/png;base64,' + btoa(e.target.result));
    this.individu.user_image = btoa(e.target.result);
  }

}
