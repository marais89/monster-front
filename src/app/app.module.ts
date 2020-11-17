import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {IndividuApiService} from './shared/individu/individu-api.service';
import {IndividuListComponent} from './individu-list/individu-list.component';
import {IndividuCreateComponent} from './individu-create/individu-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DialogInfoComponent} from './dialog-info/dialog-info.component';
import {AuthGuardService} from './authGuardService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IndividuAccountComponent} from './individu-account/individu-account.component';
import {HeaderInfoComponent} from './header-info/header-info.component';
import {IndividuService} from './shared/individu/individu.service';


@NgModule({
  declarations: [
    AppComponent,
    IndividuListComponent,
    IndividuCreateComponent,
    IndividuAccountComponent,
    LoginComponent,
    DialogInfoComponent,
    HeaderInfoComponent
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
  providers: [IndividuService, IndividuApiService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [DialogInfoComponent]
})
export class AppModule {
}
