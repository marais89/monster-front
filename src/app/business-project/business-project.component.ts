import {Component, Input, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {Business} from '../model/business/business';
import {Project} from '../model/project';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {BusinessApiService} from '../shared/business/businessApiService';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleApiService} from '../shared/schedule/schedule-api.service';
import {DialogType} from '../individu-create/individu-create.component';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';

@Component({
  selector: 'business-project',
  templateUrl: './business-project.component.html',
  styleUrls: ['./business-project.component.scss']
})
export class BusinessProjectComponent implements OnInit {


  @Input() WORDING = LanguageUtils.getWordingLanguage();
  @Input() business: Business;
  displayAddForm: boolean = false;
  project: Project = new Project();
  projectList: Project[] = [];

  constructor(private businessApiService: BusinessApiService,
              private sheaduleApiService: ScheduleApiService,
              private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'code', 'name', 'description', 'color', 'active', 'action'];
  dataSource = new MatTableDataSource<Project>(this.projectList);

  ngOnInit() {
    this.sheaduleApiService.findProjectsByBusinessId(this.business.id).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  addProject() {
    this.project.active = true;
    this.project.businessId = this.business.id;
    this.project.name = this.project.name.trim();
    this.sheaduleApiService.saveProject(this.project).subscribe(data => {
        this.dataSource.data = [...data];
        this.openDialog('Le nouveau projet a été ajouté avec succées ', DialogType.SUCCESS);
      },
      error => {
        this.openDialog('Une erreur c\'est produite lors da la sauvgarde du groupe ', DialogType.ERROR);
      },
      () => {
        this.cleanForm();
      });
  }

  private cleanForm() {
    this.displayAddForm = false;
    this.project = new Project();
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

  displayAddBusinessProject() {
    this.displayAddForm = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findBSStatus(status: boolean) {
    return status ? this.WORDING.business.group.active : this.WORDING.business.group.disable;
  }

  getButtonName(activate: boolean): String {
    return activate ? this.WORDING.business.group.disable_action : this.WORDING.business.group.activate_action;
  }

  doAction(element: Project) {
    alert('action done !');
  }

}
