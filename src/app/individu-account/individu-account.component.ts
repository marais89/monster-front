import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {IndividuService} from '../shared/individu/individu.service';

@Component({
  selector: 'app-individu-account',
  templateUrl: './individu-account.component.html',
  styleUrls: ['./individu-account.component.css']
})
export class IndividuAccountComponent implements OnInit, AfterViewInit {

  individu: Individu;
  displayErrorMsg: boolean = false;
  anonymousPic = 'assets/anonymous.jpg';
  verifiedLogo = 'assets/verified.png';
  star = 'assets/star.png';

  private static MESSAGE_OK: string = 'Vos Informations ont été mis a jouravec succée';
  private static MESSAGE_KO: string = 'Nous n\'avans pas pu éffectuer votre demande, veiller réessayer ultériairement';
  private static MESSAGE_TECK: string = 'Un problème technique est survenue, veuillez contacter notre service client';
  private user_image: any;
  private base64image: any;

  constructor(private individuService: IndividuService, private individuApiService: IndividuApiService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    if (!this.individuService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.chargeLogedUserInfo();

    }
  }

  ngAfterViewInit(): void {
    this.prepareclickedPic();
  }

  //TODO refactor
  chargeLogedUserInfo() {

    this.individuService.chargeLogedUserInfo().subscribe(ind => {
      if (ind) {
        this.individu = ind;
        if (ind.user_image) {
          this.user_image = this.convertImage(ind.user_image);
        }
      } else {
        this.router.navigate(['/login']);
        this.openDialog(IndividuAccountComponent.MESSAGE_TECK);
      }
    });

  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  updateIndividuAccountInformations() {
    this.individu.user_image = this.base64image;
    this.individuApiService.updateIndividu(this.individu).subscribe(
      data => {
        this.individuService.connectedUserInfo = data;
        this.openDialog(IndividuAccountComponent.MESSAGE_OK);
      },
      error1 => {
        this.openDialog(IndividuAccountComponent.MESSAGE_KO);
      }
    );
  }

  openDialog(msg: string): void {
    let dialogInformation = this.buildConfirmationDialog(msg);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '30%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  buildConfirmationDialog(msg: string): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = 'Confirmation';
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = 'Fermer';
    return dialogInfo;
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
    this.base64image = btoa(e.target.result);
  }

  prepareclickedPic() {
    let pic = document.getElementById('OpenImgUpload1');
    let anonymousPic = document.getElementById('OpenImgUpload2');
    let picture = document.getElementById('imgupload');
    pic.addEventListener('click', (e: Event) => picture.click());
    anonymousPic.addEventListener('click', (e: Event) => picture.click());
  }

}
