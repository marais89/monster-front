import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndividuListComponent} from './individu-list/individu-list.component';
import {IndividuCreateComponent} from './individu-create/individu-create.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard, RoleGuardService} from './authGuardService';
import {IndividuAccountComponent} from './individu-account/individu-account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PasswordUpdateComponent} from './password-update/password-update.component';
import {HistoryComponent} from './history/history.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'users', component: IndividuListComponent, canActivate: [AuthGuard, RoleGuardService]},
  {path: 'create', component: IndividuCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'updatePwd', component: PasswordUpdateComponent, canActivate: [AuthGuard]},
  {path: 'account', component: IndividuAccountComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard, RoleGuardService]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
