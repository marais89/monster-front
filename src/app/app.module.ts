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
import {AuthGuardService, RoleGuardService} from './authGuardService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IndividuAccountComponent} from './individu-account/individu-account.component';
import {HeaderInfoComponent} from './header-info/header-info.component';
import {IndividuService} from './shared/individu/individu.service';
import {UserInfosComponent} from './user-infos/user-infos.component';
import {MatAutocompleteModule, MatListModule, MatSortModule, MatTableModule, MatTabsModule} from '@angular/material';
import {IndividuPicPipe} from './shared/individu-pic-pipe';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import {PasswordUpdateComponent} from './password-update/password-update.component';
import {AuthentApiService} from './shared/authent/authent-api.service';
import {HistoryApiService} from './shared/history/history-api.service';
import {HistoryComponent} from './history/history.component';
import {BusinessApiService} from './shared/business/businessApiService';
import {BusinessComponent} from './business/business.component';
import {BusinessPicPipe} from './shared/business-pic-pipe';
import {ScheduleComponent} from './schedule/schedule.component';
import {DatePipe} from '@angular/common';
import {BusinessGroupComponent} from './business-group/business-group.component';
import {BusinessAffectationComponent} from './business-affectation/business-affectation.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IndividuListComponent,
    IndividuCreateComponent,
    UserInfosComponent,
    BusinessComponent,
    IndividuAccountComponent,
    BusinessGroupComponent,
    BusinessAffectationComponent,
    LoginComponent,
    DialogInfoComponent,
    HeaderInfoComponent,
    PasswordUpdateComponent,
    IndividuPicPipe,
    BusinessPicPipe,
    HistoryComponent,
    ScheduleComponent
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
    MatProgressSpinnerModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [IndividuService, IndividuApiService, BusinessApiService, AuthGuardService, RoleGuardService, AuthentApiService, HistoryApiService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogInfoComponent, UserInfosComponent]
})
export class AppModule {
}
