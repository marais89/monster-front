import { Component, OnInit } from '@angular/core';
import { IndividuService} from '../shared/individu/individu.service'

@Component({
  selector: 'app-individu-list',
  templateUrl: './individu-list.component.html',
  styleUrls: ['./individu-list.component.css']
})
export class IndividuListComponent implements OnInit {

  individus: Array<any>;
  displayedColumns: string[] = ['id','nom', 'prenom', 'adresse', 'email' , 'N telephone'];

  constructor(private individuService: IndividuService ) { }

  ngOnInit() {
    this.individuService.getAll().subscribe(data => {
      this.individus = data;
    });
  }

}
