import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';
import {Wording} from '../shared/wording';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-individu-create',
  templateUrl: './individu-create.component.html',
  styleUrls: ['./individu-create.component.css']
})

export class IndividuCreateComponent implements OnInit {


  //TODO pour tout les pages gérer les attributs private ou sans private
  WORDING = Wording;
  private individu: Individu;
  displayErrorMsg: boolean = false;
  actualDate: Date;
  anonymousPic = 'assets/anonymous.jpg';
  password: string;
  passwordConfirmation: string;
  REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

  constructor(private individuApiService: IndividuApiService, public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {
  }

  isConformPwd(): boolean {
    let bol = this.password === this.passwordConfirmation || this.passwordConfirmation == undefined;
    return bol;
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.individu = new Individu();
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.individu.user_image = btoa(e.target.result);
  }

  prepareclickedPic() {
    let clickedInputPic = document.getElementById('imgupload');
    clickedInputPic.click();
  }

  convertImage(data: any) {
    if (data) {
      let objectURL = 'data:image/png;base64,' + data;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
    return null;
  }

  displayUserPic() {
    return this.individu.user_image ? this.convertImage(this.individu.user_image) : this.anonymousPic;
  }


  createIndividu(): void {

    this.actualDate = new Date();
    this.individu.date_ceation = this.actualDate;
    this.individu.statut = Statut.attente;
    this.individu.niveau = Niveau.niveau1;
    const salt = bcrypt.genSaltSync(10);
    this.individu.pass = bcrypt.hashSync(this.password, salt);
    this.individuApiService.saveIndividu(this.individu).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error1 => {
        this.displayErrorMsg;
      }
    );
  }
}

enum Niveau {
  niveau1,
  niveau2,
  niveau3,
  niveau4,
  niveau5,
};

export enum Statut {
  attente = 'attente',
  active = 'active',
  bloque = 'bloque',
  resilie = 'resilie'
};
