import {Component, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {FormControl, Validators} from '@angular/forms';
import {AuthentApiService} from '../shared/authent/authent-api.service';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {DialogType} from '../individu-create/individu-create.component';
import {MatDialog} from '@angular/material/dialog';
import * as bcrypt from 'bcryptjs';
import {Router} from '@angular/router';
import {CookiesUtils} from '../utils/cookies-utils';


@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  oldPassword: string;
  password: string;
  passwordConfirmation: string;

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authent: AuthentApiService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
  }

  updatePwd() {
    if (this.isConformPwd()) {
      const salt = bcrypt.genSaltSync(10);
      let cryptedPwd = bcrypt.hashSync(this.password, salt);
      this.authent.updatePwd(this.oldPassword, cryptedPwd).subscribe(u => {
          if (u != null) {
            this.openDialog(this.WORDING.dialog.message.update_password, null, DialogType.SUCCESS);
            CookiesUtils.deleteCookie('token');
            this.router.navigate(['/login']);
          } else {
            this.openDialog(this.WORDING.problem, null, DialogType.ERROR);
          }
        },
        error1 => {
          this.openDialog(this.WORDING.problem, null, DialogType.ERROR);
        });
    }
  }

  isConformPwd(): boolean {
    let bol = this.password === this.passwordConfirmation || this.passwordConfirmation == undefined;
    return bol;
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

}
