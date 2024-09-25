import {Component, Input, OnInit} from '@angular/core';
import {Business} from '../model/business/business';
import {MatTableDataSource} from '@angular/material/table';
import {LanguageUtils} from '../utils/language-utils';
import {BusinessGroup} from '../model/business/business-group';
import {BusinessApiService} from '../shared/business/businessApiService';
import {DialogType} from '../individu-create/individu-create.component';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {concatMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Component({
  selector: 'business-group',
  templateUrl: './business-group.component.html',
  styleUrls: ['./business-group.component.scss']
})
export class BusinessGroupComponent implements OnInit {

  @Input() WORDING = LanguageUtils.getWordingLanguage();
  displayAddForm: boolean = false;
  @Input() business: Business;
  businessGroup: BusinessGroup = new BusinessGroup();
  businessGroupList: BusinessGroup[];

  constructor(
    private businessApiService: BusinessApiService,
    private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['idBusiness', 'name', 'description', 'active', 'action', 'update'];
  dataSource = new MatTableDataSource<BusinessGroup>(this.businessGroupList);

  ngOnInit(): void {
    this.loadBusinessGroup();
  }

  loadBusinessGroup() {
    if (this.business) {
      this.businessApiService.getBusinessGroupByBusinessId(this.business.id).subscribe(
        data => {
          this.businessGroupList = data;
          this.dataSource.data = this.businessGroupList;
        }
      );
    }
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayAddBusinessGroup() {
    this.displayAddForm = true;
  }

  //TODO verify business existance !
  addGroup() {
    this.businessGroup.idBusiness = this.business.id;
    this.businessGroup.active = true; // attention le cas d'update
    this.businessGroup.name = this.businessGroup.name.trim();
    this.businessApiService.saveBusinessGroup(this.businessGroup).pipe(
      concatMap(data => {
        return of(this.businessGroup);
      })).subscribe(data => {
        this.loadBusinessGroup();
        this.openDialog('Le nouveau groupe a été ajouté avec succées ', DialogType.SUCCESS);
        this.displayAddForm = false;
        this.businessGroup = new BusinessGroup();
      },
      error => {
        this.openDialog('Une erreur c\'est produite lors da la sauvgarde du groupe ', DialogType.ERROR);
      });
  }

  doUpdate(element: BusinessGroup){

    this.businessGroup = element;
    this.displayAddForm = true;
  }

  disable(businessGroup: BusinessGroup) {
    this.businessApiService.disableBusinessGroup(businessGroup.id).subscribe(
      data => {
        this.loadBusinessGroup();
        this.openDialog(this.WORDING.dialog.message.create.ok, DialogType.SUCCESS);
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      }
    );
  }

  activate(businessGroup: BusinessGroup) {
    this.businessApiService.activateBusinessGroup(businessGroup.id).subscribe(
      data => {
        this.loadBusinessGroup();
        this.openDialog(this.WORDING.dialog.message.create.ok, DialogType.SUCCESS);
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      }
    );
  }

  doAction(businessGroup: BusinessGroup) {
    businessGroup.active ? this.disable(businessGroup) : this.activate(businessGroup);
  }

  findBSStatus(status : boolean){
    return status ? this.WORDING.business.group.active : this.WORDING.business.group.disable;
  }

  getButtonName(activate: boolean): String {
    return activate ? this.WORDING.business.group.disable_action : this.WORDING.business.group.activate_action;
  }

  cancel() {
    this.businessGroup = new BusinessGroup();
    this.displayAddForm = false;
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

}
