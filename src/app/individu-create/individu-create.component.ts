import {Component, OnInit} from '@angular/core';
import {Individu} from '../model/individu';
import {IndividuService} from '../shared/individu/individu.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-individu-create',
  templateUrl: './individu-create.component.html',
  styleUrls: ['./individu-create.component.css']
})
export class IndividuCreateComponent implements OnInit {

individu: Individu = new Individu;

  constructor(private individuService: IndividuService) { }

  ngOnInit() {
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

createIndividu(): void{
  this.individuService.saveIndividu(this.individu).subscribe(
    //TODO
  )
  }

}
