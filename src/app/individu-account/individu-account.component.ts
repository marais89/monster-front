import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {IndividuService} from '../shared/individu/individu.service';
import {Wording} from '../shared/wording';
import {StringUtils} from '../utils/string-utils';

@Component({
  selector: 'app-individu-account',
  templateUrl: './individu-account.component.html',
  styleUrls: ['./individu-account.component.css']
})
export class IndividuAccountComponent implements OnInit {

  WORDING = Wording;
  individu: Individu;
  displayErrorMsg: boolean = false;
  verifiedLogo = 'assets/verified.png';
  star = 'assets/star.png';
  private user_image: any;
  displayMaxSizeImage: boolean = false;

  constructor(private individuService: IndividuService, private individuApiService: IndividuApiService, public dialog: MatDialog, private router: Router) {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.chargeLogedUserInfo();
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().subscribe(data => {
      if (data) {
        this.individu = data;
        if (data.user_image) {
          this.user_image = data.user_image;
        }
      } else {
        this.router.navigate(['/login']);
        this.openDialog(this.WORDING.problem);
      }
    });
  }

  updateIndividuAccountInformations() {
    this.individu.user_image = this.user_image;
    this.individuApiService.updateIndividu(this.individu).subscribe(
      data => {
        this.individuService.connectedUserInfo = data;
        this.openDialog(this.WORDING.dialog.message.update.ok);
      },
      error1 => {
        this.openDialog(this.WORDING.dialog.message.update.ko);
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
    });
  }

  buildConfirmationDialog(msg: string): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = this.WORDING.dialog.title.confirm;
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
  }

  onUploadChange(evt: any) {

    const file = evt.target.files[0];
    if (file) {
      if (file.size > StringUtils.FILE_MAX_SIZE) {
        this.displayMaxSizeImage = true;
        return;
      }
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.user_image = btoa(e.target.result);
  }

  prepareclickedPic() {
    this.displayMaxSizeImage = false;
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
  }
}
