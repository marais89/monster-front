import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndividuService } from './shared/individu/individu.service';
import { IndividuListComponent } from './individu-list/individu-list.component';
import { MatTableModule } from '@angular/material';
import { IndividuCreateComponent } from './individu-create/individu-create.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    IndividuListComponent,
    IndividuCreateComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    MatTableModule,
    FormsModule
  ],
  providers: [IndividuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
