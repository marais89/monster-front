import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndividuService } from './shared/individu/individu.service';
import { IndividuListComponent } from './individu-list/individu-list.component';
import { IndividuCreateComponent } from './individu-create/individu-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import {AuthGuardService} from './authGuardService';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IndividuAccountComponent} from './individu-account/individu-account.component';


@NgModule({
  declarations: [
    AppComponent,
    IndividuListComponent,
    IndividuCreateComponent,
    IndividuAccountComponent,
    LoginComponent,
    DialogInfoComponent
  ],
    imports: [
        BrowserModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatProgressSpinnerModule
    ],
  providers: [IndividuService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [DialogInfoComponent]
})
export class AppModule { }
