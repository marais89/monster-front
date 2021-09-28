import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Events} from '../model/Events';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {HistoryApiService} from '../shared/history/history-api.service';
import {LanguageUtils} from '../utils/language-utils';
import {Individu} from '../model/individu';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;


  displayedColumns2: string[] = ['datetime', 'actionType', 'actionRaison', 'actionResult', 'browserName', 'osName', 'location', 'channel'];
  dataSource2: MatTableDataSource<Events>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  constructor(private historyApiService: HistoryApiService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        const USER_NAME = params['username'];
        this.findHistories(USER_NAME);
      },
      error => {/* TODO display error*/
      });
  }

  private findHistories(username: string) {
    this.historyApiService.getHistoriesByUsername(username).subscribe(data => {
      this.dataSource2 = new MatTableDataSource<Events>(data);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator2;
    });
  }

  public updateWordingLanguage(language) {
    this.WORDING = LanguageUtils.whichWording(language);
  }

}
