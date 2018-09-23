import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
MatButtonModule,
MatMenuModule,
MatToolbarModule,
MatIconModule,
MatCardModule,
MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatCardModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule {}
