import {Component, OnInit, ViewChild} from '@angular/core';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {Individu} from '../model/individu';
import {MatDialog} from '@angular/material/dialog';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {IndividuService} from '../shared/individu/individu.service';
import {UserStatutAction} from '../utils/user-statut-action';
import {Wording} from '../shared/wording';

@Component({
  selector: 'app-individu-list',
  templateUrl: './individu-list.component.html',
  styleUrls: ['./individu-list.component.css']
})
export class IndividuListComponent implements OnInit {

  WORDING = Wording;
  loading: boolean = true;
  anonymousPic = 'assets/anonymous.jpg';
  displayedColumns: string[] = ['id', 'img', 'nom', 'prenom', 'email', 'statut', 'suspend', 'resume', 'deactivate'];
  dataSource: MatTableDataSource<Individu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public get userStatusAction(): typeof UserStatutAction {
    return UserStatutAction;
  }

  constructor(private individuApiService: IndividuApiService, private individuService: IndividuService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (!this.individuService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.findIndividus();
    }
  }

  perfermActions(login: string, action: UserStatutAction): void {
    let dialogInformation = this.buildDialogInfo(login, action);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '40%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  buildDialogInfo(login: string, action: UserStatutAction): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = 'Confirmation';
    dialogInfo.message1 = this.WORDING.dialog.message[action].info;
    dialogInfo.okLbl = 'Valider';
    dialogInfo.noLbl = 'Annuler';
    dialogInfo.onClickAction = () => this.updateIndividuStatus(login, action);
    return dialogInfo;
  }

  findIndividus() {
    this.loading = true;
    this.individuApiService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource<Individu>(data);
        this.dataSource.data.forEach(x => x.user_image = this.convertImage(x.user_image));
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error => {
        console.log('Error while loading individus !');
        this.loading = false;
      });
  }

  updateIndividuStatus(login: string, action: UserStatutAction) {
    this.individuService.updateUserStatus(login, action).subscribe(
      data => {
        if (data) {
          this.dataSource.data = data;
          this.openInfoDialog(this.WORDING.dialog.message[action].success);
        } else {
          this.openInfoDialog(this.WORDING.dialog.message[action].error);
          console.log('Error when ' + action + ' individu');
        }
      }, error => {
        this.openInfoDialog(this.WORDING.dialog.message[action].error);
        console.log('Error when ' + action + ' individu');
      });
  }

  openInfoDialog(msg: string): void {
    let dialogInformation = this.buildConfirmationDialog(msg);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '40%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  buildConfirmationDialog(msg: string): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = 'Confirmation';
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = 'Fermer';
    return dialogInfo;
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  isDeasbledSuspend(status: string): boolean{
    return status != 'active' ? true : false;
  }

  isDesabledResume(status: string): boolean{
    return (status == 'active' || status == 'resilie') ? true : false;
  }

  isDesabledDeactivate(status: string):boolean{
    return status == 'resilie' ? true : false;
  }

  //TODO on click sur ligne voir les details de l'utilisateur
}
