import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IndividuService} from '../shared/individu/individu.service';
import {Individu} from '../model/individu';
import {MatDialog} from '@angular/material/dialog';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-individu-list',
  templateUrl: './individu-list.component.html',
  styleUrls: ['./individu-list.component.css']
})
export class IndividuListComponent implements AfterViewInit, OnInit {

  loading: boolean = true;
  message: string;
  anonymousPic = 'assets/anonymous.jpg';
  displayedColumns: string[] = ['id', 'img', 'nom', 'prenom', 'email', 'N telephone', 'Supprimer'];
  dataSource: MatTableDataSource<Individu>;
  individus: Array<Individu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private individuService: IndividuService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  openDialog(id: number): void {
    let dialogInformation = this.buildDialogInfo(id);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '40%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  buildDialogInfo(id: number): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = 'Confirmation';
    dialogInfo.message1 = 'voulez vous vraiment supprimer ce client';
    dialogInfo.okLbl = 'Valider';
    dialogInfo.noLbl = 'Annuler';
    dialogInfo.onClickAction = () => this.delete(id);
    return dialogInfo;
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    if (!this.individuService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }else {
      this.findIndividus();
    }
  }

  findIndividus() {
    this.loading = true;
    this.individuService.getAll().subscribe(data => {
       // this.individus = data;
        //this.individus.forEach(x => x.user_image = this.convertImage(x.user_image));
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

  delete(id: number): void {
    this.individuService.deleteIndividu(id).subscribe(() =>
      this.findIndividus());
  }

  view(id: number) {
    alert('view client number' + id);
  }

}
