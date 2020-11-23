import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndividuListComponent} from './individu-list/individu-list.component';
import {IndividuCreateComponent} from './individu-create/individu-create.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard} from './authGuardService';
import {IndividuAccountComponent} from './individu-account/individu-account.component';

export const routes: Routes = [
  {path: '', component: IndividuListComponent, canActivate: [AuthGuard] },
  {path: 'create', component: IndividuCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: IndividuAccountComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}