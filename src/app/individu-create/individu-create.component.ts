import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuApiService} from '../shared/individu/individu-api.service';
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
  REGEX  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;

  constructor(private individuApiService: IndividuApiService, public dialog: MatDialog, private router: Router) {
  }

 isConformPwd(): boolean{
   let bol = this.password === this.passwordConfirmation || this.passwordConfirmation == undefined;
   return bol;
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
    this.individu.statut = Statut.attente;
    this.individu.niveau = Niveau.niveau1;
    const salt = bcrypt.genSaltSync(10);
    this.individu.pass = bcrypt.hashSync(this.password, salt);
    this.individuApiService.saveIndividu(this.individu).subscribe(
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

enum Niveau {
  niveau1,
  niveau2,
  niveau3,
  niveau4,
  niveau5,
};

export enum Statut {
  attente = 'attente',
  active ='active',
  bloque = 'bloque',
  resilie = 'resilie'
};