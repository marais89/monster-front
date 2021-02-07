import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {IndividuService} from '../shared/individu/individu.service';
import {Individu} from '../model/individu';
import {BrowserUtils} from '../utils/browser-utils';
import {DialogType} from '../individu-create/individu-create.component';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {LanguageUtils} from '../utils/language-utils';
import {MatDialog} from '@angular/material/dialog';
import {StringUtils} from '../utils/string-utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  accountVerifyed: boolean = false;

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private individuServiceApi: IndividuApiService, private individuService: IndividuService) {
  }

  ngOnInit() {
    this.chargeLogedUserInfo();

    console.log('browser:' + BrowserUtils.findBrowserType());
    console.log('OS:' + BrowserUtils.findOs());
    BrowserUtils.getPosition();
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().subscribe(data => {
      if (data) {
        this.individu = data;
        this.verifyKey(this.individu.email);
      }
    });
  }

  verifyKey(login: string) {
    this.activatedRoute.queryParams.subscribe(params => {
      const key = params['key'];
      if (!StringUtils.isNullOrUndefined(key)) {
        this.individuServiceApi.verifyKey(login, key).subscribe(data => {
          this.accountVerifyed = data;
          this.displayValidationKeyMessage();
        });
      }
    });
  }

  private displayValidationKeyMessage() {
    if (this.accountVerifyed) {
      this.openDialog(this.WORDING.dialog.message.valitation_account, null, DialogType.SUCCESS);
    } else {
      this.openDialog(this.WORDING.dialog.message.validation_account_error, null, DialogType.ERROR);
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

}
