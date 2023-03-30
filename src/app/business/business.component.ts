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
import {concatMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserBusinessRelationService} from '../shared/userBusinessRelation/user-business-relation.service';
import {UserBusinessRelation, UserBusinessRole, UserBusinessStatus} from '../model/user-business-relation';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {


  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  displayErrorMsg: boolean = false;
  displaySaveForm: boolean = false;
  displayMaxSizeImage: boolean;
  logo: any;
  selectedBusiness: Business;
  businessList: Business[];
  business: Business;

  constructor(private businessApiService: BusinessApiService,
              private userBusinessRelationService: UserBusinessRelationService,
              private individuService: IndividuService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.chargeLogedUserInfo();
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().pipe(
      concatMap(data => {
        if (data) {
          this.individu = data;
          return this.userBusinessRelationService.findUserBusinessRelationByUserId(this.individu.id);
        } else {
          this.router.navigate(['/login']);
          this.openDialog(this.WORDING.problem, DialogType.ERROR);
        }
      })
    ).subscribe(data => {
      if (data && data.length > 0) {
        let userBusinessRelation = data.filter(ubr => ubr.role == 'ADMIN');
        if (!isNullOrUndefined(userBusinessRelation)) {
          if (userBusinessRelation.length == 1) {
            this.selectedBusiness = userBusinessRelation[0].business;
            this.logo = this.selectedBusiness.logo;
          } else if (userBusinessRelation.length > 1) {
            const distinctBusiness: Set<Business> = new Set<Business>();
            userBusinessRelation.forEach(b => {
              if (!distinctBusiness.has(b.business)) {
                distinctBusiness.add(b.business);
                this.businessList.push(b.business);
              }
            });
          }
        }
      }
    }, () => {this.openDialog(this.WORDING.problem, DialogType.ERROR);});
  }

  public updateWordingLanguage(language) {
    this.WORDING = LanguageUtils.whichWording(language);
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

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  updateBusiness() {
    //add loader (automatic implementation)
    this.businessApiService.updateBusiness(this.selectedBusiness).subscribe(data => {
        this.selectedBusiness = data;
        this.openDialog(this.WORDING.dialog.message.update.ok, DialogType.SUCCESS);
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  saveBusiness() {
    //add loader (automatic implementation)
    this.business.creatorId = this.individu.id;
    this.businessApiService.saveBusiness(this.business).pipe(
      concatMap(data => {
        this.selectedBusiness = data;
        return of(this.selectedBusiness);
      })).pipe(
      concatMap(data => {
        let ubr = this.buildUserBusinessRelation(data);
        return this.userBusinessRelationService.saveUserBusinessRelationByGroupId(ubr);
      })
    ).subscribe(
      data => this.openDialog(this.WORDING.dialog.message.create.ok, DialogType.SUCCESS
      ),
      () => this.openDialog(this.WORDING.problem, DialogType.ERROR)
    );
  }

  private buildUserBusinessRelation(data: Business) {
    let ubr = new UserBusinessRelation();
    ubr.business = data;
    ubr.individuId = this.individu.id;
    ubr.status = UserBusinessStatus.ACTIF;
    ubr.role = UserBusinessRole.ADMIN;
    return ubr;
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

  selectBusiness(item: Business) {
    this.selectedBusiness = item;
  }
}
