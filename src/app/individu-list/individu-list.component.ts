import {Component, OnInit, ViewChild} from '@angular/core';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {Individu} from '../model/individu';
import {MatDialog} from '@angular/material/dialog';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IndividuService} from '../shared/individu/individu.service';
import {UserStatutAction} from '../utils/user-statut-action';
import {UserInfosComponent} from '../user-infos/user-infos.component';
import {Status} from '../individu-create/individu-create.component';
import {ColorUtils} from '../utils/color-utils';
import {LanguageUtils} from '../utils/language-utils';

@Component({
  selector: 'app-individu-list',
  templateUrl: './individu-list.component.html',
  styleUrls: ['./individu-list.component.css']
})
export class IndividuListComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  displayedColumns: string[] = ['img', 'nom', 'prenom', 'email', 'statut', 'suspend', 'resume', 'deactivate'];
  dataSource: MatTableDataSource<Individu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public get userStatusAction(): typeof UserStatutAction {
    return UserStatutAction;
  }

  constructor(private individuApiService: IndividuApiService, private individuService: IndividuService, public dialog: MatDialog) {
  }

  //TODO faire un min width dans le html / gerer le respensive de la page

  ngOnInit() {
    this.findIndividus();
  }

  perfermActions(login: string, action: UserStatutAction): void {
    let dialogInformation = this.buildDialogInfo(login, action);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '40%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  buildDialogInfo(login: string, action: UserStatutAction): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = this.WORDING.dialog.title.confirm;
    dialogInfo.message1 = this.WORDING.dialog.message[action].info;
    dialogInfo.okLbl = this.WORDING.dialog.button.confirm;
    dialogInfo.noLbl = this.WORDING.dialog.button.concel;
    dialogInfo.onClickAction = () => this.updateIndividuStatus(login, action);
    return dialogInfo;
  }

  findIndividus() {
    this.individuApiService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource<Individu>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('Error while loading individus !' + error.status);
        if (error.status == '403') {
          this.openInfoDialog(this.WORDING.dialog.message.authorities_error, 'Erreur');
        } else {
          this.openInfoDialog(this.WORDING.problem, 'Erreur');
        }
      });
  }

  updateIndividuStatus(login: string, action: UserStatutAction) {
    this.individuService.updateUserStatus(login, action).subscribe(
      data => {
        if (data) {
          this.dataSource.data = data;
          this.openInfoDialog(this.WORDING.dialog.message[action].success, this.WORDING.dialog.title.confirm);
        } else {
          this.openInfoDialog(this.WORDING.dialog.message[action].error, 'Erreur');
          console.log('Error when ' + action + ' individu');
        }
      }, error => {
        this.openInfoDialog(this.WORDING.dialog.message[action].error, 'Erreur');
        console.log('Error when ' + action + ' individu');
      });
  }

  openInfoDialog(msg: string, title: string): void {
    let dialogInformation = this.buildConfirmationDialog(msg, title);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '35%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  buildConfirmationDialog(msg: string, title: string): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = title;
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
  }

  isDeasbledSuspend(status: string): boolean {
    return status != 'active' ? true : false;
  }

  isDesabledResume(status: string): boolean {
    return (status == 'active' || status == 'resilie') ? true : false;
  }

  isDesabledDeactivate(status: string): boolean {
    return status == 'resilie' ? true : false;
  }

  displayUserInfoPopup(individu: Individu) {
    const dialogRef = this.dialog.open(UserInfosComponent, {
      minWidth: '25em', width: '30%'
    });
    dialogRef.componentInstance.individu = individu;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  findColorOfStatus(status: Status) {
    return ColorUtils.COLOROFSTATUS(status);
  }

  public updateWordingLanguage(language) {
    this.WORDING = LanguageUtils.whichWording(language);
  }
}
