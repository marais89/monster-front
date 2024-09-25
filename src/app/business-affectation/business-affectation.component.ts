import {Component, Input, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {FormControl, Validators} from '@angular/forms';
import {BusinessGroup} from '../model/business/business-group';
import {MatTableDataSource} from '@angular/material/table';
import {UserBusinessRelation, UserBusinessRole, UserBusinessStatus} from '../model/business/user-business-relation';
import {BusinessApiService} from '../shared/business/businessApiService';
import {Business} from '../model/business/business';
import {UserBusinessRelationService} from '../shared/userBusinessRelation/user-business-relation.service';
import {DialogType} from '../individu-create/individu-create.component';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'business-affectation',
  templateUrl: './business-affectation.component.html',
  styleUrls: ['./business-affectation.component.scss']
})
export class BusinessAffectationComponent implements OnInit {

  @Input() WORDING = LanguageUtils.getWordingLanguage();
  @Input() business: Business;
  displayAddForm: boolean = false;
  groups: BusinessGroup[];
  userBusinessRelation = new UserBusinessRelation();
  userBusinessRelationList: UserBusinessRelation[];
  roleList: UserBusinessRole[] = Object.values(UserBusinessRole);

  constructor(private userBusinessApiService: UserBusinessRelationService,
              private businessApiService: BusinessApiService,
              private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['email', 'group', 'role', 'status', 'action', 'update'];
  dataSource = new MatTableDataSource<UserBusinessRelation>(this.userBusinessRelationList);

  ngOnInit() {

    this.loadUserBusinessRelations();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUserBusinessRelations() {
    if (this.business) {
      this.userBusinessApiService.findUserBusinessRelationByBusinessId(this.business.id).subscribe(
        data => {
          this.userBusinessRelationList = data;
          this.dataSource.data = this.userBusinessRelationList;
        }
      );
    }
  }

  loadBusinessGroups() {
    this.businessApiService.getBusinessGroupByBusinessId(this.business.id).subscribe(
      data => {
        this.groups = data;
      }
    );
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  displayAddUserBusinessRelationForm() {
    this.displayAddForm = true;
    this.loadBusinessGroups();
  }

  assignOrUpdateUserBusiness() {
    //TODO check in front that email is not affected to desired group
    //TODO 1) add assignment in db table (use email in place of individu object)
    // in back verify that email is not assigned ti this group (back control)
    // TODO 2) send notification
    // TODO check in backend if admin ad update , we should have at least one admin
    this.userBusinessRelation.business = this.business;
    this.userBusinessRelation.status = UserBusinessStatus.WAITING;
    this.userBusinessRelation.email = this.userBusinessRelation.email.trim();
    this.userBusinessApiService.saveUserBusinessRelation(this.userBusinessRelation).subscribe(
      data => {
        this.dataSource.data = data;
        this.displayAddForm = false;
        this.openDialog('L\'affectation utilisateur au groupe a été faite avec succées ', DialogType.SUCCESS);
        this.cleanForm();
      },
      error => {
        this.openDialog('Une erreur c\'est produite lors da l\'affectation ', DialogType.ERROR);
      }
    );

  }

  public objectComparisonFunction = function (option, value): boolean {
    return option && value ? option.id === value.id : null;
  };

  getButtonName(status: string): String {
    return status == 'ACTIF' ? this.WORDING.business.group.disable_action : this.WORDING.business.group.activate_action;
  }

  doAction(element) {
    alert('Action !');
  }

  doUpdate(element: UserBusinessRelation){
    this.loadBusinessGroups();
    this.userBusinessRelation = element;
    this.displayAddForm = true;
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

  cancel() {
    this.displayAddForm = false;
  }

  private cleanForm() {
    this.userBusinessRelation = new UserBusinessRelation();
  }
}
