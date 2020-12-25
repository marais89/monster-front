import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {Wording_FR} from '../shared/wording_FR';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {StringUtils} from '../utils/string-utils';

@Component({
  selector: 'app-individu-create',
  templateUrl: './individu-create.component.html',
  styleUrls: ['./individu-create.component.css']
})

export class IndividuCreateComponent implements OnInit {


  //TODO pour tout les pages gérer les attributs private ou sans private
  WORDING = Wording_FR;
  private individu: Individu;
  displayErrorMsg: boolean = false;
  actualDate: Date;
  password: string;
  passwordConfirmation: string;
  displayMaxSizeImage: boolean = false;

  constructor(private individuApiService: IndividuApiService, public dialog: MatDialog, private router: Router) {
  }

  isConformPwd(): boolean {
    let bol = this.password === this.passwordConfirmation || this.passwordConfirmation == undefined;
    return bol;
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.individu = new Individu();
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

  openDialog(msg1: string, msg2: string, type: DialogType): void {
    let dialogInformation = this.buildConfirmationDialog(msg1, msg2, type);
    const dialogRef = this.dialog.open(DialogInfoComponent);
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  buildConfirmationDialog(msg1: string, msg2: string, type: DialogType): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.message1 = msg1;
    dialogInfo.message2 = msg2;
    dialogInfo.dialogType = type;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
  }

  handleReaderLoaded(e) {
    this.individu.user_image = btoa(e.target.result);
  }

  prepareclickedPic() {
    this.displayMaxSizeImage = false;
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
  }

  createIndividu(): void {

    this.actualDate = new Date();
    this.individu.date_ceation = this.actualDate;
    this.individu.statut = Status.attente;
    this.individu.niveau = Niveau.niveau1;
    const salt = bcrypt.genSaltSync(10);
    this.individu.pass = bcrypt.hashSync(this.password, salt);
    this.individuApiService.saveIndividu(this.individu).subscribe(
      data => {
        switch (data.responseCode) {
          case '00' :
            this.openDialog(this.WORDING.dialog.message.create_user_1, this.WORDING.dialog.message.create_user_2, DialogType.SUCCESS);
            this.router.navigate(['/login']);
            break;
          case '01' :
            this.openDialog(this.WORDING.problem, null, DialogType.ERROR);
            break;
          case '02' :
            this.openDialog(this.WORDING.dialog.message.create_user_existe, null, DialogType.ERROR);
            break;
          case '03' :
            this.openDialog(this.WORDING.problem, null, DialogType.ERROR);
            break;
        }

      },
      error1 => {
        this.openDialog(this.WORDING.problem, null, DialogType.ERROR);
        this.displayErrorMsg;
      }
    );
  }
}

enum Niveau {
  niveau1,
  niveau2,
  niveau3,
  niveau4,
  niveau5,
};

export enum Status {
  attente = 'attente',
  active = 'active',
  bloque = 'bloque',
  resilie = 'resilie'
};

export enum DialogType {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
}
