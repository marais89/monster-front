import { Component, OnInit } from '@angular/core';
import {BrowserUtils} from '../utils/browser-utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    console.log("browser:"+ BrowserUtils.findBrowserType());
    console.log("OS:"+ BrowserUtils.findOs());
    BrowserUtils.getPosition();
  }

}
