import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndividuService } from './shared/individu/individu.service';
import { IndividuListComponent } from './individu-list/individu-list.component';
import { MatTableModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    IndividuListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [IndividuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
