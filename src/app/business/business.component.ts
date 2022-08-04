import {Component, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {Business} from '../model/business';
import {BusinessApiService} from '../shared/business/businessApiService';
import {Individu} from '../model/individu';
import {FormControl, Validators} from '@angular/forms';
import {StringUtils} from '../utils/string-utils';
import {DialogType} from '../individu-create/individu-create.component';
import {IndividuService} from '../shared/individu/individu.service';
import {Router} from '@angular/router';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {


  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  business: Business;
  displayErrorMsg: boolean = false;
  hasBusiness: boolean = false;
  displaySaveForm: boolean = false;
  displayMaxSizeImage: boolean;
  logo: any;

  constructor(private businessApiService: BusinessApiService,
              private individuService: IndividuService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.chargeLogedUserInfo();
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().subscribe(data => {
      if (data) {
        this.individu = data;
        this.retrieveBusinessInfo();
      } else {
        this.router.navigate(['/login']);
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      }
    });
  }

  openDialog(msg: string, type: DialogType): void {
    let dialogInformation = this.buildConfirmationDialog(msg, type);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      minWidth: '20em', width: '35%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  buildConfirmationDialog(msg: string, type: DialogType): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = this.WORDING.dialog.title.confirm;
    dialogInfo.dialogType = type;
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
  }

  retrieveBusinessInfo() {
    if (this.individu && this.individu.id) {
      this.businessApiService.getBusinessByCreatorId(this.individu.id).subscribe(data => {
        if (data) {
          this.business = data;
          this.hasBusiness = true;
          this.logo = this.business.logo;
        }
      },
        () => {
          this.openDialog(this.WORDING.problem, DialogType.ERROR);
        });
    }
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  updateBusiness() {
    //add loader (automatic implementation)
    this.businessApiService.updateBusiness(this.business).subscribe(data => {
        this.business = data;
        this.openDialog(this.WORDING.dialog.message.update.ok, DialogType.SUCCESS);
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  saveBusiness() {
    //add loader (automatic implementation)
    this.business.creatorId = this.individu.id;
    this.businessApiService.saveBusiness(this.business).subscribe(data => {
        this.business = data;
        this.openDialog(this.WORDING.dialog.message.create.ok, DialogType.SUCCESS);
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  switchToForm() {
    this.business = new Business();
    this.displaySaveForm = true;
  }

  prepareclickedPic() {
    this.displayMaxSizeImage = false;
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
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
    this.logo = btoa(e.target.result);
  }

}
