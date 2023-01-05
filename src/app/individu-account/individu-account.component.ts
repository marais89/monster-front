import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {IndividuService} from '../shared/individu/individu.service';
import {StringUtils} from '../utils/string-utils';
import {LanguageUtils} from '../utils/language-utils';
import {DialogType} from '../individu-create/individu-create.component';
import {AddressApiService} from '../shared/address/address-api.service';
import {Country} from '../model/country';
import {Governorate} from '../model/governorate';
import {Address} from '../model/address';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  displayAddressError: boolean = false;

  countries: Country[];
  governorates: Governorate[];
  addresses: Address[] = new Array<Address>();
  filteredAddresses: Observable<Address[]>;

  selectedCountry: Country;
  selectedGovernorate: Governorate;
  selectedAddress: Address;
  selectedCompAddress: string;

  myControl = new FormControl();


  constructor(private individuService: IndividuService,
              private individuApiService: IndividuApiService,
              private addressApiService: AddressApiService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.retieveAllCountries();
    this.chargeLogedUserInfo();

    this.filteredAddresses = this.myControl.valueChanges
      .pipe(
        // startWith(''),
        map(value => this._filter(value))
      );
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  displayFn(address?: Address): string | undefined {
    return address ? StringUtils.normalizeAddress(address.city + ' , ' + address.town + ' - ' + address.code) : undefined;
  }

  private _filter(value: string): Address[] {
    const filterValue = StringUtils.normalizeAddress(value);

    let ad: Address[] = new Array<Address>();
    this.addresses.forEach(function (el) {
      if (StringUtils.normalizeAddress(el.town + ' ' + el.city).indexOf(filterValue) !== -1 ||
        StringUtils.normalizeAddress(el.city + ' ' + el.town).indexOf(filterValue) !== -1 ||
        parseInt(filterValue) === el.code) {
        ad.push(el);
      }
    });
    return ad;
  }

  findGovernorateByCountry(countryId: number) {
    this.addressApiService.findGovernorateByCountryId(countryId).subscribe(data => {
        this.governorates = data;
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  public objectComparisonFunction = function (option, value): boolean {
    return option.id === value.id;
  };

  findAddressByGouvernorat(id: number) {
    this.addressApiService.findAdressByGouvernorat(id).subscribe(data => {
        this.addresses = data;
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  private retieveAllCountries() {
    this.addressApiService.retrieveAllCountries().subscribe(countries => {
        this.countries = countries;
      },
      () => {
        this.openDialog(this.WORDING.problem, DialogType.ERROR);
      });
  }

  chargeLogedUserInfo() {
    this.individuService.chargeLogedUserInfo().subscribe(data => {
      if (data) {
        this.individu = data;
        if (data.user_image) {
          this.user_image = data.user_image;
        }
        if (this.individu.addressDetails) {
          this.selectedCountry = this.individu.addressDetails.governorate.country;
          this.selectedGovernorate = this.individu.addressDetails.governorate;
          this.findGovernorateByCountry(this.selectedCountry.id);
          this.selectedAddress = this.individu.addressDetails;
          this.findAddressByGouvernorat(this.selectedGovernorate.id);
          this.selectedCompAddress = this.individu.addressComplement;
        }
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

  updateIndividuAccountInformations() {

    if (StringUtils.isNullOrUndefined(this.selectedCountry) ||
      StringUtils.isNullOrUndefined(this.selectedGovernorate) ||
      StringUtils.isNullOrUndefined(this.selectedAddress) ||
      StringUtils.isNullOrUndefined(this.selectedCompAddress)||
      StringUtils.isNullOrUndefined(this.individu.numeroTel)) {
      this.openDialog(this.WORDING.individu_account.all_mondatory, DialogType.ERROR);
    } else {

      this.selectedGovernorate.country = this.selectedCountry;
      this.selectedAddress.governorate = this.selectedGovernorate;
      this.individu.addressDetails = this.selectedAddress;
      this.individu.addressComplement = this.selectedCompAddress;
      this.displayAddressError = false;
      this.individu.user_image = this.user_image;
      this.individuApiService.updateIndividu(this.individu).subscribe(
        data => {
          this.individuService.connectedUserInfo = data;
          this.openDialog(this.WORDING.dialog.message.update.ok, DialogType.SUCCESS);
        },
        () => {
          this.openDialog(this.WORDING.dialog.message.update.ko, DialogType.ERROR);
        }
      );
    }
  }

  prepareclickedPic() {
    this.displayMaxSizeImage = false;
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
  }

  public updateWordingLanguage(language) {
    this.WORDING = LanguageUtils.whichWording(language);
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

}
