import {Component, Input, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {Business} from '../model/business';
import {BusinessApiService} from '../shared/business/businessApiService';
import {Individu} from '../model/individu';
import {FormControl, Validators} from '@angular/forms';
import {StringUtils} from '../utils/string-utils';

@Component({
  selector: 'business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {


  WORDING = LanguageUtils.getWordingLanguage();
  @Input() individu: Individu;
  business: Business;
  displayErrorMsg: boolean = false;
  hasBusiness: boolean= false;
  displaySaveForm: boolean = false;
  displayMaxSizeImage: boolean;
  logo: any;

  constructor(private businessApiService: BusinessApiService) {
  }

  ngOnInit() {
    this.retrieveBusinessInfo();
  }

  retrieveBusinessInfo() {
    if (this.individu && this.individu.id) {
      this.businessApiService.getBusinessByCreatorId(this.individu.id).subscribe(data => {
        if(data){
          this.business = data;
          this.hasBusiness = true;
          this.logo = this.business.logo;
        }
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
        //display success msg
      },
      () => {
        // display error msg
      });
  }

  saveBusiness() {
    //add loader (automatic implementation)
    this.business.status= "WAITING";
    this.businessApiService.saveBusiness(this.business).subscribe(data => {
        this.business = data;
        //display success msg
      },
      () => {
        // display error msg
      });
  }

  switchToForm(){
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
