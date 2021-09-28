import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {IndividuService} from '../shared/individu/individu.service';
import {StringUtils} from '../utils/string-utils';
import {Town} from '../model/town';
import {Adress} from '../model/adress';
import {LanguageUtils} from '../utils/language-utils';

@Component({
  selector: 'app-individu-account',
  templateUrl: './individu-account.component.html',
  styleUrls: ['./individu-account.component.scss']
})
export class IndividuAccountComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  displayErrorMsg: boolean = false;
  verifiedLogo = 'assets/verified.png';
  star = 'assets/star.png';
  user_image: any;
  displayMaxSizeImage: boolean = false;
  allAdress: Adress[];
  allAdress2: Adress[] = new Array<Adress>();
  allAdress3: Adress[] = new Array<Adress>();
  gouvernorats: Town[];
  selectedGouvernorat: Town = new Town();
  filtedVilles: Set<string> = new Set<string>();
  filtedCity: Set<string> = new Set<string>();
  displayAddressError: boolean = false;

  constructor(private individuService: IndividuService,
              private individuApiService: IndividuApiService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.chargeLogedUserInfo();
    this.retrieveAllTown();
  }

  findAdressByGouvernorat(id: number) {
    this.individuApiService.getAdressByGouvernorat(id).subscribe(data => {
      this.reinitVilleAndCity();
      this.allAdress = data;
      this.allAdress.forEach(adr => {
        this.filtedVilles.add(adr.ville);
        this.allAdress2.push(adr);
      });
    });
  }

  reinitVilleAndCity() {
    this.filtedVilles = new Set<string>();
    this.filtedCity = new Set<string>();
    this.individu.ville = null;
    this.individu.cite = null;
    this.individu.code_postale = null;
  }

  findAdressByGouvernoratAndVille() {
    this.filtedCity = new Set<string>();
    this.individu.cite = null;
    this.individu.code_postale = null;
    this.allAdress3 = new Array<Adress>();
    this.allAdress2.forEach(adr => this.insertCity(adr));
  }

  findPostalCode() {
    this.allAdress3.forEach(adr => this.findCp(adr));
  }

  findCp(adr: Adress) {
    if (adr.cite === this.individu.cite) {
      this.individu.code_postale = adr.code;
      return;
    }
  }

  insertCity(adr: Adress) {
    if (adr.ville === this.individu.ville) {
      this.filtedCity.add(adr.cite);
      this.allAdress3.push(adr);
    }
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  public updateWordingLanguage(language) {
    this.WORDING = LanguageUtils.whichWording(language);
  }

  retrieveAllTown() {
    this.individuApiService.getAllTown().subscribe(data => {
      if (data) {
        this.gouvernorats = data;
        this.selectedGouvernorat = this.findGouvernoratByName(this.individu.gouvernorat);
      }
    });
  }

  findGouvernoratByName(gouvernorat: string): Town {
    let gouv: Town = new Town();
    this.gouvernorats.forEach(g => {
      if (g.name === gouvernorat) {
        gouv = g;
      }
    });
    return gouv;
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().subscribe(data => {
      if (data) {
        this.individu = data;
        if (data.user_image) {
          this.user_image = data.user_image;
        }
        if (this.individu.gouvernorat) {
          this.selectedGouvernorat.name = this.individu.gouvernorat;
        }
        this.filtedVilles.add(this.individu.ville);
        this.filtedCity.add(this.individu.cite);
      } else {
        this.router.navigate(['/login']);
        this.openDialog(this.WORDING.problem);
      }
    });
  }

  updateIndividuAccountInformations() {
    this.individu.gouvernorat = this.selectedGouvernorat.name;
    if (!this.checkAddressValidity()) {
      this.displayAddressError = true;
      return;
    }
    this.displayAddressError = false;
    this.individu.user_image = this.user_image;
    this.individuApiService.updateIndividu(this.individu).subscribe(
      data => {
        this.individuService.connectedUserInfo = data;
        this.openDialog(this.WORDING.dialog.message.update.ok);
      },
      () => {
        this.openDialog(this.WORDING.dialog.message.update.ko);
      }
    );
  }

  openDialog(msg: string): void {
    let dialogInformation = this.buildConfirmationDialog(msg);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      minWidth: '20em', width: '35%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  buildConfirmationDialog(msg: string): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = this.WORDING.dialog.title.confirm;
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
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
    this.user_image = btoa(e.target.result);
  }

  prepareclickedPic() {
    this.displayMaxSizeImage = false;
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
  }

  private checkAddressValidity(): boolean {
    return StringUtils.isNullOrUndefined(this.individu.gouvernorat) === StringUtils.isNullOrUndefined(this.individu.ville)
      && StringUtils.isNullOrUndefined(this.individu.cite) === StringUtils.isNullOrUndefined(this.individu.code_postale)
      && StringUtils.isNullOrUndefined(this.individu.gouvernorat) === StringUtils.isNullOrUndefined(this.individu.cite);
  }
}
