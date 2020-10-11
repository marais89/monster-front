import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuService} from '../shared/individu/individu.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-individu-create',
  templateUrl: './individu-create.component.html',
  styleUrls: ['./individu-create.component.css']
})

export class IndividuCreateComponent implements OnInit {

  private individu: Individu;
  displayErrorMsg: boolean = false;
  actualDate: Date;
  anonymousPic = 'assets/anonymous.jpg';
  password: string;
  passwordConfirmation: string;
  showDetails: boolean;
   REGEX  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

  constructor(private individuService: IndividuService, public dialog: MatDialog, private router: Router) {
  }

 isConformPwd(): boolean{
   let bol = this.password === this.passwordConfirmation || this.passwordConfirmation == undefined;
   return bol;
 }

 isRegexConform(): boolean{
  let bol = this.REGEX.test(this.password) &&  this.REGEX.test(this.passwordConfirmation);
  return bol;
 }

 canValidatForm(): boolean{
   return this.isConformPwd() && this.nameFormControl.invalid;
 }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit() {
    this.individu = new Individu();
    let pic = document.getElementById('OpenImgUpload1');
    let anonymousPic = document.getElementById('OpenImgUpload2');
    let picture = document.getElementById('imgupload');
    pic.addEventListener('click', (e: Event) => picture.click());
    anonymousPic.addEventListener('click', (e: Event) => picture.click());
  }



  base64textString;

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = ('data:image/png;base64,' + btoa(e.target.result));
    this.individu.user_image = btoa(e.target.result);
  }


  createIndividu(): void {

    this.actualDate = new Date();
    this.individu.date_ceation = this.actualDate;
    this.individu.statut = statut.attente;
    this.individu.niveau = niveau.niveau1;
    const salt = bcrypt.genSaltSync(10);
    this.individu.pass = bcrypt.hashSync(this.password, salt);
    this.individuService.saveIndividu(this.individu).subscribe(
      data => {
        console.log('individu saved ');
        this.router.navigate(['/login']);
      },
      error1 => {
        this.displayErrorMsg;
      }
    );
  }
}

enum niveau {
  niveau1,
  niveau2,
  niveau3,
  niveau4,
};

enum statut {
  attente = 'attente',
  active = 'active',
  bloque = 'bloque',
  resilie = 'resilie'
};
